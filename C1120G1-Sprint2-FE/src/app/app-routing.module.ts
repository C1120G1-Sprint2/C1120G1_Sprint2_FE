import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainHomePageComponent} from './module/main/main-home-page/main-home-page.component';
import {RegisterComponent} from './module/security/register/register.component';
import {LoginComponent} from './module/security/login/login.component';
import {LogoutComponent} from './module/security/logout/logout.component';
import {MovieSelectionComponent} from './module/booking/movie-selection/movie-selection.component';
import {SeatSelectionComponent} from './module/booking/seat-selection/seat-selection.component';
import {ConfirmBookingComponent} from './module/booking/confirm-booking/confirm-booking.component';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./module/admin/admin.module').then(module => module.AdminModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./module/employee/employee.module').then(module => module.EmployeeModule)
  },
  {path: '', component: MainHomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},

  {path: 'booking', component: MovieSelectionComponent},
  {path: 'seat', component: SeatSelectionComponent},
  {path: 'confirm', component: ConfirmBookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
