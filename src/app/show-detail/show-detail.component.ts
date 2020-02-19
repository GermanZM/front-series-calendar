import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FilmService } from '../film/service/FilmService';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss']
})
export class ShowDetailComponent implements OnInit {

  @Input() child: string;
  @Input() childObject: any;
  nFilms: any[];

  constructor(private breakpointObserver: BreakpointObserver, private filmService: FilmService, private sanitizer: DomSanitizer) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnInit(): void {
    this.childObject.forEach(element => {
      console.log(element.photo);
    });
  }

  getChildObject(): any {
    return this.childObject;
  }


  getImage(imageName: string) {
    this.filmService.getFilmImage(imageName)
    .subscribe((response: any) => {
      console.log(response);
      const objectURL = 'data:image/png;base64,' + response;
      const img: any = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      return img;
    });
  }
}
