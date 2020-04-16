import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmService } from '../film/service/FilmService';
import { Observable } from 'rxjs';
import { tap, map, shareReplay, filter } from 'rxjs/operators';
import { SerieService } from '../serie/Service/SerieService';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { debug } from 'util';


@Component({
  selector: 'app-show-base',
  templateUrl: './show-base.component.html',
  styleUrls: ['./show-base.component.scss']
})
export class ShowBaseComponent implements OnInit {

  child: string;
  observer$: Observable<any>;
  filterValue = '';

  constructor(private breakpointObserver: BreakpointObserver,
              private route: Router, private filmService: FilmService, private serieService: SerieService) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );


  ngOnInit() {
    if (this.route.url === '/series') {
      this.child = 'series';
      this.observer$ = this.serieService.getSeries().pipe(
        tap(data => {
          return data;
        })
      );
    } else if (this.route.url === '/films') {
      this.child = 'films';
      this.observer$ = this.filmService.getFilms().pipe(
        tap(data => {
          return data;
        })
      );
    }

  }

  handleSearch(value: string) {
    this.filterValue = value;
  }



}
