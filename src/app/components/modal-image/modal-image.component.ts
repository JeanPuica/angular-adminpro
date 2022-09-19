import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { ModalImageService } from 'src/app/services/modal-image.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [],
})
export class ModalImageComponent implements OnInit, OnDestroy {
  hiddeModal: boolean = true;
  modal$ = new Subscription();
  imageToUpload: any;
  imgTemp: any;
  img: string = '';
  type: 'users' | 'medics' | 'hospitals' = 'users';
  userId: string = '';

  constructor(
    private modalImageService: ModalImageService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.modal$ = this.modalImageService.modal.subscribe(
      ({ hiddeModal, img, type, id }) => {
        this.hiddeModal = hiddeModal;
        this.img = img;
        this.type = type;
        this.userId = id;
      }
    );
  }

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
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
      .updatePhoto(this.imageToUpload, 'users', this.userId)
      .subscribe({
        next: (resp: any) => {
          Swal.fire('Muy bien!', 'Se cargo la foto exitosamente', 'success');
          this.modalImageService.newImage.emit(resp);
          this.closeModal();
        },
        error: ({ error }) => {
          Swal.fire('Error', error.message, 'error');
        },
      });
  }

  ngOnDestroy(): void {
    this.modal$.unsubscribe();
  }
}
