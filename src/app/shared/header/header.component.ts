import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UserI } from '../../models/user.model';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  userInfo?: UserI;
  imgUrl = '';
  usr$ = new Subscription();

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

  ngAfterViewInit(): void {
    $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
      $(".app-search").toggle(200);
    });
  }

  search(term: string) {
    if (!term.length) {
      return;
    }

    this.router.navigate([`/dashboard/search/${term}`]);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(): void {
    this.usr$.unsubscribe();
  }
}
