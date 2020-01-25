import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { CalendarGlobalApp } from '../CalendarGlobalApp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLogin$: boolean;
  urlLogin = false;

  constructor(private router: Router, private calendarApp: CalendarGlobalApp) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.urlLogin = event.url === '/' ? false : true;
        this.checkIsLogin();
      }
    });
  }

  public loginClick() {
    this.urlLogin = true;
  }

  checkIsLogin() {
    const key: string = this.calendarApp.getGlobalProperties().isLoginStorage;

    if (this.calendarApp.getCurrentUser() == null && sessionStorage.getItem(key) == null) {
      this.isLogin$ = false;
    } else if (sessionStorage.getItem(key) != null) {
      this.isLogin$ = sessionStorage.getItem(key) === 'true';
    } else if (this.calendarApp.getCurrentUser() != null) {
      this.isLogin$ = true;
      sessionStorage.setItem(key, this.isLogin$.toString());
    }
  }

}

