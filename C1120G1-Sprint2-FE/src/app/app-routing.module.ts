import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainHomePageComponent} from './module/main/main-home-page/main-home-page.component';
import {RegisterComponent} from './module/security/register/register.component';
import {LoginComponent} from './module/security/login/login.component';
import {LogoutComponent} from './module/security/logout/logout.component';
import {MovieSelectionComponent} from './module/booking/movie-selection/movie-selection.component';
import {SeatSelectionComponent} from './module/booking/seat-selection/seat-selection.component';
import {ConfirmBookingComponent} from './module/booking/confirm-booking/confirm-booking.component';
import {MainContentComponent} from "./module/main/main-content/main-content.component";
import {MainSearchComponent} from "./module/main/main-search/main-search.component";
import {MainBookingComponent} from './module/booking/main-booking/main-booking.component';
import {MovieSelectedComponent} from './module/booking/movie-selected/movie-selected.component';
import {BookingInformationComponent} from './module/booking/booking-information/booking-information.component';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./module/admin/admin.module').then(module => module.AdminModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./module/employee/employee.module').then(module => module.EmployeeModule)
  },
  {
    path: '',
    component: MainHomePageComponent,
    children: [
      {path: '', component: MainContentComponent},
      {path: 'search', component: MainSearchComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},

  {
    path: 'booking',
    component: MainBookingComponent,
    children: [
      {path: '', redirectTo: 'movie', pathMatch:'full'},
      {path: 'movie', component: MovieSelectionComponent},
      {path: 'movie/:id', component: MovieSelectedComponent},
      {path: 'seat', component: SeatSelectionComponent},
      {path: 'confirm', component: ConfirmBookingComponent},
      {path: 'information', component: BookingInformationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
