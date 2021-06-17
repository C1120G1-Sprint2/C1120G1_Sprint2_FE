import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionHistoryComponent } from './account-management/transaction-history/transaction-history.component';
import { AccountInfoComponent } from './account-management/account-info/account-info.component';
import { TicketsBookingComponent } from './account-management/tickets-booking/tickets-booking.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [TransactionHistoryComponent, AccountInfoComponent, TicketsBookingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class MemberModule { }
