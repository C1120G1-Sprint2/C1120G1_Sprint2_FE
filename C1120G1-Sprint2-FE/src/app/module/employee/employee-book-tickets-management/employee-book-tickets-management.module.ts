import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeBookTicketsManagementRoutingModule } from './employee-book-tickets-management-routing.module';
import { BookTicketListComponent } from './book-ticket-list/book-ticket-list.component';
import { GetTicketComponent } from './get-ticket/get-ticket.component';
import { CancelTicketComponent } from './cancel-ticket/cancel-ticket.component';
import { ConfirmTicketComponent } from './confirm-ticket/confirm-ticket.component';
import { PrintTicketComponent } from './print-ticket/print-ticket.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from '../../../app-routing.module';


@NgModule({
  declarations: [BookTicketListComponent, GetTicketComponent, CancelTicketComponent,
    ConfirmTicketComponent, PrintTicketComponent],
  imports: [
    CommonModule,
    EmployeeBookTicketsManagementRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class EmployeeBookTicketsManagementModule { }
