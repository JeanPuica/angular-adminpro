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

  constructor(private http: HttpClient) { }

  get token() {
    return localStorage.getItem('token') || '';
  }

  get user() {
    return localStorage.getItem('user') || '';
  }

  get role() {
    const currentUser = JSON.parse(localStorage.getItem('user') ?? '');
    return currentUser?.role;
  }

  setUserSession() {
    const user = localStorage.getItem('user') || '';
    const userInfo = JSON.parse(user);
    this.user$.next(new User({ ...userInfo }));
  }

  validToken(): Observable<boolean> {
    return this.http.get('/api/auth/renew').pipe(
      map(({ token, user, menu }: any) => {
        this.user$.next(new User({ ...user }));
        this.saveCredencials(token, menu);
        localStorage.setItem('user', user);
        return true;
      }),
      catchError(() => of(false)) // return new observable
    );
  }

  saveCredencials(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
  }

  createUser(body: Partial<RegisterForm>) {
    return this.http
      .post('/api/users', body)
      .pipe(tap((resp: any) => this.saveCredencials(resp.token, resp.menu)));
  }

  updateUserProfile(
    data: Pick<UserI, 'email' | 'name' | 'role'>,
    userId: string
  ) {
    return this.http.put(`/api/users/${userId}`, data);
  }

  updateUser(data: UserI) {
    return this.http.put(`/api/users/${data.id}`, data);
  }

  login(body: LoginForm) {
    return this.http.post('/api/auth', body).pipe(
      tap((resp: any) => {
        this.saveCredencials(resp.token, resp.menu);
        localStorage.setItem('user', JSON.stringify(resp.user));
      })
    );
  }

  loadUsers(from: number = 0) {
    return this.http.get<{ total: number; users: UserI[] }>('/api/users', {
      params: { offset: from },
    });
  }

  deleteUser(userId: string) {
    return this.http.delete(`/api/users/${userId}`);
  }
}
