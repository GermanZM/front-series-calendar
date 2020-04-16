import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { CalendarHomeComponent } from '../calendar-home/calendar-home.component';
import { CalendarGlobalApp } from '../CalendarGlobalApp';
import { ShowBaseComponent } from '../show-base/show-base.component';
import { AuthGuard } from '../auth/guard/Auth.guard';
import { LoginGuard } from '../auth/guard/LoginGuard';
import { RegisterComponent } from '../auth/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'calendar', component: CalendarHomeComponent, canActivate: [AuthGuard] },
  { path: 'series', component: ShowBaseComponent, canActivate: [AuthGuard]},
  { path: 'films', component: ShowBaseComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CalendarGlobalApp]
})
export class AppRoutingModule { }
