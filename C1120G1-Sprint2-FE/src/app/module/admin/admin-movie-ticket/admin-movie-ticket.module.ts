import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMovieTicketManagementComponent } from './create-movie-ticket-management/create-movie-ticket-management.component';
import { EditMovieTicketManagementComponent } from './edit-movie-ticket-management/edit-movie-ticket-management.component';
import { DeleteMovieTicketManagementComponent } from './delete-movie-ticket-management/delete-movie-ticket-management.component';
import { ListMovieTicketManagementComponent } from './list-movie-ticket-management/list-movie-ticket-management.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminMovieTicketRoutingModule} from './admin-movie-ticket-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [CreateMovieTicketManagementComponent, EditMovieTicketManagementComponent, DeleteMovieTicketManagementComponent, ListMovieTicketManagementComponent],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        AdminMovieTicketRoutingModule,
        FormsModule,
        MatIconModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatInputModule
    ]
})
export class AdminMovieTicketModule { }
