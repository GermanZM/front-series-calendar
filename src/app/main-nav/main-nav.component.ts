import { Component } from '@angular/core';
import { BreakpointObserver} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CalendarGlobalApp } from '../CalendarGlobalApp';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  user = '';

  customPixel = '(max-width: 766.99px) and (orientation: portrait), (max-width: 959.99px) and (orientation: landscape)';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(this.customPixel)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private calendarApp: CalendarGlobalApp) {
    this.user = this.calendarApp.getCurrentUser().username;
  }


}
