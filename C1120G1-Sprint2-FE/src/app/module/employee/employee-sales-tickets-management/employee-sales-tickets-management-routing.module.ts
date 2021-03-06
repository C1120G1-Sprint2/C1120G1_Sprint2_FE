import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieSelectionComponent} from './movie-selection/movie-selection.component';
import {SeatSelectionComponent} from './seat-selection/seat-selection.component';
import {ConfirmSaleTicketComponent} from './confirm-sale-ticket/confirm-sale-ticket.component';
import {InforSaleTicketComponent} from './infor-sale-ticket/infor-sale-ticket.component';


const routes: Routes = [
  {path: '', component: MovieSelectionComponent},
  {path: 'seat', component: SeatSelectionComponent},
  {path: 'confirmSaleTicket', component: ConfirmSaleTicketComponent},
  {path: 'info', component: InforSaleTicketComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeSalesTicketsManagementRoutingModule { }
