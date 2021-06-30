import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainHomePageComponent} from './module/main/main-home-page/main-home-page.component';
import {RegisterComponent} from './module/security/register/register.component';
import {LoginComponent} from './module/security/login/login.component';
import {LogoutComponent} from './module/security/logout/logout.component';
import {DetailMovieComponent} from './module/main/detail-movie/detail-movie.component';
import {PriceTicketClientComponent} from './module/main/price-ticket-client/price-ticket-client.component';

import {MovieSelectionComponent} from './module/booking/movie-selection/movie-selection.component';
import {SeatSelectionComponent} from './module/booking/seat-selection/seat-selection.component';
import {ConfirmBookingComponent} from './module/booking/confirm-booking/confirm-booking.component';
import {MainContentComponent} from "./module/main/main-content/main-content.component";
import {MainSearchComponent} from "./module/main/main-search/main-search.component";
import {MainBookingComponent} from './module/booking/main-booking/main-booking.component';
import {MovieSelectedComponent} from './module/booking/movie-selected/movie-selected.component';
import {BookingInformationComponent} from './module/booking/booking-information/booking-information.component';
// import {LoginGoogleComponent} from './module/security/login-google/login-google.component';
import {AccountInfoComponent} from './module/member/account-management/account-info/account-info.component';
import {TransactionHistoryComponent} from './module/member/account-management/transaction-history/transaction-history.component';
import {TicketsBookingComponent} from './module/member/account-management/tickets-booking/tickets-booking.component';

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
      {path: 'search', component: MainSearchComponent},
      {path: 'detail-movie/:id', component: DetailMovieComponent}
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
  },

  {path: 'ticket-price', component: PriceTicketClientComponent},

  {
    path: 'member', children: [
      {
        path: 'info', component: AccountInfoComponent,
      }, {
        path: 'history', component: TransactionHistoryComponent,
      }, {
        path: 'booking', component: TicketsBookingComponent,
      },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
