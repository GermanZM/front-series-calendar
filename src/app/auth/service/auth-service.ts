import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.post<any>(`${this.calendarApp.getGlobalProperties().baseServerUrl}/authenticate`, params);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.calendarApp.getGlobalProperties().baseServerUrl}/logout`, this.calendarApp.getCurrentUser());
  }

}
