import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { map, tap, Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  validToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get('/api/auth/renew', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        tap((resp: any) => localStorage.setItem('token', resp.token)),
        map(() => true),
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

  login(body: LoginForm) {
    return this.http
      .post('/api/auth', body)
      .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)));
  }
}
