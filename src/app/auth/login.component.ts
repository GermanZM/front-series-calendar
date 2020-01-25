import { Component } from '@angular/core';
import { AuthService } from './service/auth-service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Utility } from '../Utility/utility';
import { CalendarGlobalApp } from '../CalendarGlobalApp';
import { User } from './model/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string;
  password: string;
  private utility: Utility;
  hide = true;

  constructor(private authService: AuthService, private router: Router, private calendarApp: CalendarGlobalApp) {
    this.username = '';
    this.password = '';
    this.utility = this.calendarApp.getUtility();
  }

  public login_click() {
    if (this.checkUser()) {
      this.authService.login(this.username, this.password)
      .subscribe(response => {
        this.calendarApp.newUserInstance();
        this.calendarApp.getCurrentUser().username = this.username;
        this.calendarApp.getCurrentUser().accessToken = response.jwtToken;
        this.saveUserToStorage(this.calendarApp.getCurrentUser());
        this.router.navigate(['/calendar']);
      }, error => {
        if (error.status === 400 || error.status === 401) {
          swal.fire('Error credenciales', 'Usuario o clave incorrectas', 'error');
        }
      }
      );
    }
  }

  private checkUser(): boolean {

    const header = 'Error Login';

    if ((this.utility.checkIsNull(this.username) || this.utility.checkIsEmpty(this.username)) &&
       (this.utility.checkIsNull(this.password) || this.utility.checkIsEmpty(this.password))) {
        swal.fire(header, 'Campos usuario y contraseña son obligatorios', 'error');
        return false;
    } else if (this.utility.checkIsNull(this.username) || this.utility.checkIsEmpty(this.username)) {
      swal.fire(header, 'Campo usuario obligatorio', 'error');
      return false;
    } else if (this.utility.checkIsNull(this.password) || this.utility.checkIsEmpty(this.password)) {
      swal.fire(header, 'Campo contraseña obligatorio', 'error');
      return false;
    }

    return true;

  }

  /**
   * Save user login in session Storage
   */
  private saveUserToStorage(user: User) {
    const key: string = this.calendarApp.getGlobalProperties().actualUser;
    sessionStorage.setItem(key, JSON.stringify(new User().loadUserByUsername(user, this.username)));
  }

}
