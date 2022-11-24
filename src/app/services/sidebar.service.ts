import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [];

  loadMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu') ?? '[]');
  }

  // menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     root: '/dashboard',
  //     submenu: [
  //       { subTitle: 'Principal', url: '/' },
  //       { subTitle: 'ProgressBar', url: '/progress' },
  //       { subTitle: 'Gráficas', url: '/grafica1' },
  //       { subTitle: 'Promesas', url: '/promesas' },
  //       { subTitle: 'Rxjs', url: '/rxjs' },
  //     ],
  //   },
  //   {
  //     title: 'Mantenimientos',
  //     icon: 'mdi mdi-folder-lock-open',
  //     root: '/manteinment',
  //     submenu: [
  //       { subTitle: 'Usuarios', url: '/usuarios' },
  //       { subTitle: 'Hospitales', url: '/hospitales' },
  //       { subTitle: 'Médicos', url: '/medicos' },
  //     ],
  //   }
  // ];
}
