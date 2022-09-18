import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, UserI } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems: any[];
  userInfo?: UserI;
  imgUrl = '';
  usr$?: Subscription;

  constructor(
    private sideBarService: SidebarService,
    private userService: UserService
  ) {
    this.menuItems = sideBarService.menu;
  }

  ngOnInit(): void {
    this.usr$ = this.userService.user$.subscribe((user) => {
      if (user) {
        this.userInfo = user.data;
        this.imgUrl = user.imageUrl;
      }
    });
  }

  ngOnDestroy(): void {
    this.usr$?.unsubscribe();
  }
}
