import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UserI } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userInfo?: UserI;
  imgUrl = '';
  usr$?: Subscription;

  constructor(private router: Router, private userService: UserService) {
    // this.imgUrl = userService.user!.imageUrl;
  }

  ngOnInit(): void {
    this.usr$ = this.userService.user$.subscribe((user) => {
      if (user) {
        this.userInfo = user.data;
        this.imgUrl = user.imageUrl;
      }
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(): void {
    this.usr$?.unsubscribe();
  }
}
