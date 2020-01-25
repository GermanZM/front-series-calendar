import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../auth/login.component';
import { CalendarHomeComponent } from '../calendar-home/calendar-home.component';
import { CalendarGlobalApp } from '../CalendarGlobalApp';
import { ShowBaseComponent } from '../show-base/show-base.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'calendar', component: CalendarHomeComponent },
  { path: 'series', component: ShowBaseComponent},
  { path: 'films', component: ShowBaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CalendarGlobalApp]
})
export class AppRoutingModule { }
