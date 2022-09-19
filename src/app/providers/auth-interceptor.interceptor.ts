import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token') || '';
    let request = req;

    if (token.length > 0) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigate(['/auth/login']);
        }

        return throwError(() => err);
      })
    );
  }
}
