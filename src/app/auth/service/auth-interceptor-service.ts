import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { CalendarGlobalApp } from 'src/app/CalendarGlobalApp';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError, EMPTY } from 'rxjs';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private calendarApp: CalendarGlobalApp, private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url !== 'http://localhost:8081/authenticate' && req.url !== 'http://localhost:8081/register') {
      const token: string = this.calendarApp.getCurrentUser().accessToken;
      const authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
      return next.handle(authReq).pipe(catchError(error => {
        if (error.status === 401) {
          // auto logout if 401 response returned from SPRING
          this.authService.logout().subscribe(response => {
            if (response === 'OK') {
              this.authService.afterLogout('La sesión ha caducado, inicia sesión nuevamente', 'warning');
            }
          });
        }
        return EMPTY;
      }));
    } else {
      return next.handle(req);
    }

  }

}
