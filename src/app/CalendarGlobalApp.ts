import { Injectable } from '@angular/core';
import { GlobalProperties } from './globalProperties';
import { User } from './auth/model/user';
import { Utility } from './Utility/utility';

@Injectable()
export class CalendarGlobalApp {

    private properties: GlobalProperties;
    private user: User;
    private utility: Utility;

    constructor() {
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

}
