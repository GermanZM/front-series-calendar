import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarGlobalApp } from 'src/app/CalendarGlobalApp';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private calendarApp: CalendarGlobalApp) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (req.url !== 'http://localhost:8081/authenticate') {
      const token: string = this.calendarApp.getCurrentUser().accessToken;
      const authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
      return next.handle(authReq);
    }

    return next.handle(req);
  }

}
