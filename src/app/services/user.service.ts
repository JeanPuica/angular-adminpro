import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { map, tap, Observable, catchError, of, BehaviorSubject } from 'rxjs';
import { UserI, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem('token') || '';
  }

  get user_id() {
    return 
  }

  validToken(): Observable<boolean> {
    return this.http
      .get('/api/auth/renew', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .pipe(
        map(({ token, user }: any) => {
          // const { email, name, role, id, google, image } = user;
          // this.user$.next(new User(id, name, email, '', image, google, role));
          this.user$.next(new User({ ...user }));
          localStorage.setItem('token', token);
          return true;
        }),
        catchError(() => of(false)) // return new observable
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  createUser(body: Partial<RegisterForm>) {
    return this.http
      .post('/api/users', body)
      .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)));
  }

  updateUserProfile(data: Pick<UserI, 'email' | 'name' | 'role'>, userId: string) {
    return this.http.put(`/api/users/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  login(body: LoginForm) {
    return this.http
      .post('/api/auth', body)
      .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)));
  }
}
