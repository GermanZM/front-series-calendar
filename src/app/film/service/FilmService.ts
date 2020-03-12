import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CalendarGlobalApp } from 'src/app/CalendarGlobalApp';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient, private calendarApp: CalendarGlobalApp) {}

  getFilms(): Observable<any> {
      return this.http.get(`${this.calendarApp.getGlobalProperties().baseServerUrl}/films/`);
  }

  getFilmImage(imageName: string): Observable<any> {
      const url = `${this.calendarApp.getGlobalProperties().baseServerUrl}/films/images/${imageName}`;
      return this.http.get(url);
  }

}
