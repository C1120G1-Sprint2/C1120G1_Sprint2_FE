import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import {AdminRoomManagementModule} from './admin-room-management/admin-room-management.module';
import {ToastrModule} from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';
import {AdminMovieTicketModule} from './admin-movie-ticket/admin-movie-ticket.module';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [AdminPageComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminRoomManagementModule,
    HttpClientModule,
    ToastrModule,
    MatDialogModule,
    AdminMovieTicketModule,
    RouterModule
  ]
})
export class AdminModule { }
