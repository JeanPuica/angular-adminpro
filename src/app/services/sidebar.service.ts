import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      root: '/dashboard',
      submenu: [
        { subTitle: 'Principal', url: '/' },
        { subTitle: 'ProgressBar', url: '/progress' },
        { subTitle: 'Gráficas', url: '/grafica1' },
        { subTitle: 'Promesas', url: '/promesas' },
        { subTitle: 'Rxjs', url: '/rxjs' },
      ],
    }
  ];

  constructor() { }
}
