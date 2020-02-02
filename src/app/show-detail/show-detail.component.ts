import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { FilmService } from '../film/service/FilmService';
import { ImgSrcDirective } from '@angular/flex-layout';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss']
})
export class ShowDetailComponent {

  @Input() child: string;
  @Input() childObject: any;

  constructor(private breakpointObserver: BreakpointObserver, private filmService: FilmService) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  getChildObject(): any {
    return this.childObject;
  }

  getPhoto(photoName: string) {
    this.filmService.getFilmImage(photoName).subscribe(data => {
      console.log(data);
    });
  }



}
