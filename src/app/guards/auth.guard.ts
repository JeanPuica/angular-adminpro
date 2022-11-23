import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.userService.token;

    if(!token) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    this.userService.setUserSession();
    return true;
    // return this.userService.validToken().pipe(
    //   tap((isAuthenticated) => {
    //     if (!isAuthenticated) {
    //       this.router.navigate(['/auth/login']);
    //     }
    //   })
    // );
  }
}
