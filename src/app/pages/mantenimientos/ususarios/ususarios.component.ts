import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { UserI } from 'src/app/models/user.model';
import { SearchsService } from 'src/app/services/searchs.service';
import { UserService } from 'src/app/services/user.service';
import { ModalImageService } from 'src/app/services/modal-image.service';

@Component({
  selector: 'app-ususarios',
  templateUrl: './ususarios.component.html',
  styles: [],
})
export class UsusariosComponent implements OnInit, OnDestroy {
  totalUsers = 0;
  users: UserI[] = [];
  offset = 0;
  usr$ = new Subscription();
  img$ = new Subscription();
  loading = true;
  currentUser: UserI;

  constructor(
    private userService: UserService,
    private searchService: SearchsService,
    private modalImageService: ModalImageService
  ) {
    this.currentUser = this.userService.user$.value!.data;
  }

  ngOnInit(): void {
    this.load();

    this.img$ = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe((resp) => this.load());
  }

  changePage(value: number) {
    this.offset += value;

    if (this.offset < 0) {
      this.offset = 0;
    } else if (this.offset > this.totalUsers) {
      this.offset -= value;
    }

    this.load();
  }

  load() {
    this.loading = true;
    this.usr$ = this.userService
      .loadUsers(this.offset)
      .subscribe(({ total, users }) => {
        this.totalUsers = total;
        this.users = users;
        this.loading = false;
      });
  }

  searchUsers(value: string) {
    if (value.length === 0) {
      this.load();
      return;
    }

    this.usr$ = this.searchService
      .search('users', value)
      .subscribe(({ results }) => {
        this.users = results;
      });
  }

  deleteUser(user: UserI) {
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta apunto de borrar a ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usr$ = this.userService.deleteUser(user.id).subscribe((resp) => {
          Swal.fire(
            'Usuario Eliminado',
            `${user.name} fue eliminado correctamente`,
            'success'
          );
        });

        this.load();
      }
    });
  }

  changeRole(eventValue: any, user: UserI) {
    user.role = eventValue.target.value;

    this.usr$ = this.userService.updateUser(user).subscribe();
  }

  openModal(user: UserI) {
    this.modalImageService.openModal('users', user.id, user.image);
  }

  ngOnDestroy(): void {
    this.usr$.unsubscribe();
    this.img$.unsubscribe();
  }
}
