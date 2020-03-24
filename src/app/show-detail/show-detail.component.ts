import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FilmService } from '../film/service/FilmService';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss']
})
export class ShowDetailComponent {

  @Input() child: string;
  @Input() childObject: any;
  nFilms: any[];

  constructor(private breakpointObserver: BreakpointObserver, private filmService: FilmService) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  getChildObject(): any {
    return this.childObject;
  }

  getPhotoUrl(): string {
    const series = 'http://localhost:8081/server/images/series/';
    const films = 'http://localhost:8081/server/images/films/';
    return this.child === 'series' ? series : films;
  }

}
