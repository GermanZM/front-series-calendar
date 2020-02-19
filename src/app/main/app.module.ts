import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material/';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../auth/login.component';
import { CalendarHomeComponent } from '../calendar-home/calendar-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule, MatInputModule, MatCardModule } from '@angular/material/';
import { ShowBaseComponent } from '../show-base/show-base.component';
import { ShowDetailComponent } from '../show-detail/show-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthInterceptorService } from '../auth/service/auth-interceptor-service';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    CalendarHomeComponent,
    ShowBaseComponent,
    ShowDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NgbModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  bootstrap: [AppComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }]
})
export class AppModule { }
