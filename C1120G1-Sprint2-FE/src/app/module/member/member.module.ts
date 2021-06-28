import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionHistoryComponent } from './account-management/transaction-history/transaction-history.component';
import { AccountInfoComponent } from './account-management/account-info/account-info.component';
import { TicketsBookingComponent } from './account-management/tickets-booking/tickets-booking.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "../../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { TicketCancelComponent } from './account-management/ticket-cancel/ticket-cancel.component';
import { NavBarAccountManagerComponent } from './account-management/nav-bar-account-manager/nav-bar-account-manager.component';

@NgModule({
  declarations: [TransactionHistoryComponent, AccountInfoComponent, TicketsBookingComponent, TicketCancelComponent, NavBarAccountManagerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ]
})
export class MemberModule { }
