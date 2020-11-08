import { Component } from '@angular/core';
import { AuthService } from '../service/auth-service';
import { Router } from '@angular/router';
import { CalendarGlobalApp } from 'src/app/CalendarGlobalApp';
import { Utility } from 'src/app/Utility/utility';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  username: string;
  password: string;
  private utility: Utility;
  hide = true;

  constructor(private authService: AuthService, private router: Router, private calendarApp: CalendarGlobalApp) {
    this.username = '';
    this.password = '';
    this.utility = this.calendarApp.getUtility();
  }

  public register_click() {
    const msg = this.utility.checkUser(this.username, this.password);
    const headerMsg = 'Se ha producido un error';

    if (msg === '') {
      this.authService.register(this.username, this.password).subscribe(response => {
        if (response.statusCode === 400) {
          swal.fire(headerMsg, response.message, 'error');
        } else {
          swal.fire('', 'Se ha registrado correctamente', 'success');
          this.router.navigate(['/login']);
        }
      }
      );
    } else {
      swal.fire(headerMsg, msg, 'error');
    }
  }

}
