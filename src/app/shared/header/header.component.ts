import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  constructor(private router: Router, private userService: UserService) {}

  logout() {
    this.userService.logout();
    this.router.navigate(['/auth']);
  }
}
