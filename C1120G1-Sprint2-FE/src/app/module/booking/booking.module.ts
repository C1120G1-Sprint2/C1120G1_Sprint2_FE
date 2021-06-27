import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieSelectionComponent } from './movie-selection/movie-selection.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MovieSelectedComponent } from './movie-selected/movie-selected.component';
import {MainModule} from '../main/main.module';
import { MainBookingComponent } from './main-booking/main-booking.component';
import { BookingInformationComponent } from './booking-information/booking-information.component';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  declarations: [MovieSelectionComponent, SeatSelectionComponent, ConfirmBookingComponent, MovieSelectedComponent, MainBookingComponent, BookingInformationComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MainModule,
    MatStepperModule
  ]
})
export class BookingModule { }
