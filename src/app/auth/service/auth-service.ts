import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CalendarGlobalApp } from 'src/app/CalendarGlobalApp';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private calendarApp: CalendarGlobalApp) {}
  login(username: string, password: string): Observable<any> {

    const params = {
      username,
      password
    };

    return this.http.post<any>(this.calendarApp.getGlobalProperties().urlAuthenticateServer, params);

  }

}
