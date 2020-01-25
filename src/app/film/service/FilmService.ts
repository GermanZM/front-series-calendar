import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalendarGlobalApp } from 'src/app/CalendarGlobalApp';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

    constructor(private http: HttpClient, private calendarApp: CalendarGlobalApp) {}

    getFilms(): Observable<any> {
        const httpOptions = new HttpHeaders
        ({
          Authorization: `Bearer ${this.calendarApp.getCurrentUser().accessToken}`
        });
        return this.http.get(this.calendarApp.getGlobalProperties().urlFilms, {headers: httpOptions});
    }

}
