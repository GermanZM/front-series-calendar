import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalendarGlobalApp } from 'src/app/CalendarGlobalApp';
import swal, { SweetAlertIcon } from 'sweetalert2';
import { Router } from '@angular/router';
import { FactoryUser } from '../factory/FactoryUser';

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

  register(username: string, password: string): Observable<any> {
    const newUser = FactoryUser.createNewUser();
    newUser.username = username;
    newUser.password = password;
    return this.http.post<any>(`${this.calendarApp.getGlobalProperties().baseServerUrl}/register`, newUser);
  }

  /**
   * Clear localStorage and show alert
   * @param msg Message
   * @param typeMsg Type
   */
  afterLogout(msg: string, typeMsg: SweetAlertIcon) {
    const actualUserKey = this.calendarApp.getGlobalProperties().actualUser;
    const isLoginKey = this.calendarApp.getGlobalProperties().isLoginStorage;
    if (localStorage.getItem(actualUserKey) != null || localStorage.getItem(isLoginKey) != null) {
      localStorage.removeItem(isLoginKey);
      localStorage.removeItem(actualUserKey);
      this.calendarApp.setCurrentUser(null);
      this.router.navigate(['/login']);
      swal.fire('Logout', msg , typeMsg);
    }
  }

  /**
   * Check if the user is logged
   */
  checkUserIsLogged(): boolean {
    const valueIsLogin = localStorage.getItem(this.calendarApp.getGlobalProperties().isLoginStorage) === 'true' ? true : false;
    if ( valueIsLogin === true) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  /**
   * Control if the user is logged and try to redirect to /login
   */
  userIsLoggedLoginURL(): boolean {
    const valueIsLogin = localStorage.getItem(this.calendarApp.getGlobalProperties().isLoginStorage) === 'true' ? true : false;
    if ( valueIsLogin === true) {
      this.router.navigate(['/calendar']);
    }
    return true;
  }

}
