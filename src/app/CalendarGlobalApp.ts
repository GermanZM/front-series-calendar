import { Injectable } from '@angular/core';
import { GlobalProperties } from './globalProperties';
import { User } from './auth/model/user';
import { Utility } from './Utility/utility';
import { Router } from '@angular/router';

@Injectable()
export class CalendarGlobalApp {

    private properties: GlobalProperties;
    private user: User;
    private utility: Utility;

    constructor(private router: Router) {
        this.properties = new GlobalProperties();
        this.utility = new Utility();
        const key: string = this.properties.actualUser;
        if (sessionStorage.getItem(key) != null) {
            this.user = JSON.parse(sessionStorage.getItem(key));
        }
    }

    newUserInstance() {
        this.user = new User();
    }

    getCurrentUser(): User {
        return this.user;
    }

    getUtility(): Utility {
        return this.utility;
    }

    getGlobalProperties(): GlobalProperties {
        return this.properties;
    }

    /*logout() {
      const actualUserKey = this.getGlobalProperties().actualUser;
      const isLoginKey = this.getGlobalProperties().isLoginStorage;
      if (sessionStorage.getItem(actualUserKey) != null || sessionStorage.getItem(isLoginKey) != null) {
        sessionStorage.removeItem(isLoginKey);
        sessionStorage.removeItem(actualUserKey);
        this.user = null;
        console.log('Se ha desconectado correctamente');
        this.router.navigate(['/']);
      }
    }*/

}
