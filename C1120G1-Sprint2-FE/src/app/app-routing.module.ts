import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainHomePageComponent} from './module/main/main-home-page/main-home-page.component';
import {RegisterComponent} from './module/security/register/register.component';
import {LoginComponent} from './module/security/login/login.component';
import {LogoutComponent} from './module/security/logout/logout.component';
import {DetailMovieComponent} from './module/main/detail-movie/detail-movie.component';
import {PriceTicketClientComponent} from './module/main/price-ticket-client/price-ticket-client.component';

import {AccountInfoComponent} from './module/member/account-management/account-info/account-info.component';
import {TransactionHistoryComponent} from './module/member/account-management/transaction-history/transaction-history.component';
import {TicketsBookingComponent} from './module/member/account-management/tickets-booking/tickets-booking.component';

// @ts-ignore
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
  {path: 'detail-movie/:id', component: DetailMovieComponent},
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
