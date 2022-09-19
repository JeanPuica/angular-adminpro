import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalImageService {
  private _modal = new BehaviorSubject<{
    hiddeModal: boolean;
    img: string;
    type: 'users' | 'medics' | 'hospitals';
    id: string;
  }>({
    hiddeModal: true,
    img: '',
    type: 'users',
    id: '',
  });

  newImage = new EventEmitter<string>();

  constructor() {}

  get modal() {
    return this._modal;
  }

  openModal(
    type: 'users' | 'medics' | 'hospitals',
    id: string,
    img: string = ''
  ) {
    this._modal.next({ hiddeModal: false, img, type, id });
  }

  closeModal() {
    this._modal.next({
      hiddeModal: true,
      img: '',
      type: 'users',
      id: '',
    });
  }
}
