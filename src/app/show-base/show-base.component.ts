import { Component, OnInit, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { Router } from '@angular/router';
import { FilmService } from '../film/service/FilmService';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-show-base',
  templateUrl: './show-base.component.html',
  styleUrls: ['./show-base.component.scss']
})
export class ShowBaseComponent implements OnInit {

  public child: string;
  observer$: Observable<any>;

  constructor(private route: Router, private filmService: FilmService) {}

  ngOnInit() {
    if (this.route.url === '/series') {
      this.child = 'series';
    } else if (this.route.url === '/films') {
      this.child = 'films';
      this.observer$ = this.filmService.getFilms().pipe(tap(data => {
        return data;
      }));
    }

  }



}
