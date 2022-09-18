import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { User, UserI } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  userInfo?: UserI;
  usr$?: Subscription;
  imageToUpload: any;
  imgUrl = '';
  imgTemp: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [''],
    });
  }

  ngOnInit(): void {
    this.usr$ = this.userService.user$.subscribe((user) => {
      if (user) {
        this.userInfo = user.data;
        this.imgUrl = user.imageUrl;
      }
    });

    this.setForm();
  }

  setForm() {
    if (this.userInfo) {
      this.profileForm.controls['name'].setValue(this.userInfo.name);
      this.profileForm.controls['email'].setValue(this.userInfo.email);
      this.profileForm.controls['role'].setValue(this.userInfo.role);
    }
  }

  updateProfile() {
    this.userService
      .updateUserProfile(this.profileForm.value, this.userInfo!.id)
      .subscribe({
        next: ({ user }: any) => {
          this.userService.user$.next(new User({ ...user }));
          Swal.fire(
            'Guardado',
            'Se guardaron correctamente los datos',
            'success'
          );
        },
        error: ({ error }) => {
          Swal.fire('Error', error.message, 'error');
        },
      });
  }

  onChangeImage(e: any) {
    this.imageToUpload = e.target.files[0];

    if (!this.imageToUpload) {
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.imageToUpload);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  uploadImage() {
    this.fileUploadService
      .updatePhoto(this.imageToUpload, 'users', this.userInfo!.id)
      .subscribe({
        next: (resp: any) => {
          const user = new User({ ...this.userInfo! });
          user.data.image = resp.fileName;
          this.userService.user$.next(user);

          Swal.fire('Muy bien!', 'Se cargo la foto exitosamente', 'success');
        },
        error: ({ error }) => {
          Swal.fire('Error', error.message, 'error');
        },
      });
  }

  ngOnDestroy(): void {
    this.usr$!.unsubscribe();
  }
}
