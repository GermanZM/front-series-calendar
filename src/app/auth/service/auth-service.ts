import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalendarGlobalApp } from 'src/app/CalendarGlobalApp';
import swal, { SweetAlertIcon } from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private calendarApp: CalendarGlobalApp, private router: Router) {}
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

  /**
   * Clear sessionStorage and show alert
   * @param msg Message
   * @param typeMsg Type
   */
  afterLogout(msg: string, typeMsg: SweetAlertIcon) {
    const actualUserKey = this.calendarApp.getGlobalProperties().actualUser;
    const isLoginKey = this.calendarApp.getGlobalProperties().isLoginStorage;
    if (sessionStorage.getItem(actualUserKey) != null || sessionStorage.getItem(isLoginKey) != null) {
      sessionStorage.removeItem(isLoginKey);
      sessionStorage.removeItem(actualUserKey);
      this.calendarApp.setCurrentUser(null);
      this.router.navigate(['/login']);
      swal.fire('Logout', msg , typeMsg);
    }
  }

}
