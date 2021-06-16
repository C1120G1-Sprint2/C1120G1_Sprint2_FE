import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeSalesTicketsManagementRoutingModule } from './employee-sales-tickets-management-routing.module';
import { SelectMovieComponent } from './select-movie/select-movie.component';
import { SelectSeatComponent } from './select-seat/select-seat.component';
import { ConfirmSaleTicketComponent } from './confirm-sale-ticket/confirm-sale-ticket.component';
import { InforSaleTicketComponent } from './infor-sale-ticket/infor-sale-ticket.component';


@NgModule({
  declarations: [SelectMovieComponent, SelectSeatComponent, ConfirmSaleTicketComponent, InforSaleTicketComponent],
  imports: [
    CommonModule,
    EmployeeSalesTicketsManagementRoutingModule
  ]
})
export class EmployeeSalesTicketsManagementModule { }
