import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionHistoryComponent } from './account-management/transaction-history/transaction-history.component';
import { AccountInfoComponent } from './account-management/account-info/account-info.component';
import { TicketsBookingComponent } from './account-management/tickets-booking/tickets-booking.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [TransactionHistoryComponent, AccountInfoComponent, TicketsBookingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class MemberModule { }
