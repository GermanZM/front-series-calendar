import { Component } from '@angular/core';
import { AuthService } from '../service/auth-service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Utility } from '../../Utility/utility';
import { CalendarGlobalApp } from '../../CalendarGlobalApp';
import { User } from '../model/user';

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
    const msg = this.utility.checkUser(this.username, this.password);
    const headerMsg = 'Se ha producido un error';

    if (msg === '') {
      this.authService.login(this.username, this.password)
      .subscribe(response => {
        if (response.statusCode === 400) {
          swal.fire(headerMsg, response.message, 'error');
        } else if (response.statusCode === 401) {
          swal.fire(headerMsg, response.message, 'error');
        } else {
          this.calendarApp.setCurrentUser(response.customUser);
          this.calendarApp.getCurrentUser().accessToken = response.jwtToken;
          this.saveUserToStorage(this.calendarApp.getCurrentUser());
          this.router.navigate(['/calendar']);
          if (this.calendarApp.getCurrentUser().profile === null) {
            swal.fire({
              title: '¿Desea configurar su perfil?',
              text: 'Es necesario configurar el perfil para recuperar la contraseña.',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmar',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
              if (result.value) {
                this.router.navigate(['/configuration']);
              }
            });
          }
        }
      }
      );
    } else {
      swal.fire(headerMsg, msg, 'error');
    }
  }

  /**
   * Save user login in session Storage
   */
  private saveUserToStorage(user: User) {
    const key: string = this.calendarApp.getGlobalProperties().actualUser;
    localStorage.setItem(key, JSON.stringify({ accessToken: user.accessToken}));
  }

}
