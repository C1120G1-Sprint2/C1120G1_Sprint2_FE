import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieSelectionComponent } from './movie-selection/movie-selection.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [MovieSelectionComponent, SeatSelectionComponent, ConfirmBookingComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class BookingModule { }
