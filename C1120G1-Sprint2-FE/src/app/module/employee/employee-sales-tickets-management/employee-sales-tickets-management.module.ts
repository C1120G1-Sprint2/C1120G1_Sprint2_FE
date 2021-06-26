import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeSalesTicketsManagementRoutingModule} from './employee-sales-tickets-management-routing.module';
import {MovieSelectionComponent} from './movie-selection/movie-selection.component';
import {SeatSelectionComponent} from './seat-selection/seat-selection.component';
import {ConfirmSaleTicketComponent} from './confirm-sale-ticket/confirm-sale-ticket.component';
import {InforSaleTicketComponent} from './infor-sale-ticket/infor-sale-ticket.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [MovieSelectionComponent, SeatSelectionComponent, ConfirmSaleTicketComponent, InforSaleTicketComponent],
  imports: [
    CommonModule,
    EmployeeSalesTicketsManagementRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class EmployeeSalesTicketsManagementModule {
}
