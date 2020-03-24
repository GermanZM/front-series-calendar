import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CalendarGlobalApp } from 'src/app/CalendarGlobalApp';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  constructor(private http: HttpClient, private calendarApp: CalendarGlobalApp) {}

  getSeries(): Observable<any> {
      return this.http.get(`${this.calendarApp.getGlobalProperties().baseServerUrl}/series/`);
  }

  getSerieImage(imageName: string): Observable<any> {
      const url = `${this.calendarApp.getGlobalProperties().baseServerUrl}/series/images/${imageName}`;
      return this.http.get(url);
  }

}
