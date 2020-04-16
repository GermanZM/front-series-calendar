import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent {

  @Input() child: string;
  @Input() childObject: any;
  @Input() searchValue: string;
  nFilms: any[];

  constructor(private breakpointObserver: BreakpointObserver) {}

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
