import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoomManagementRoutingModule } from './admin-room-management-routing.module';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomCreateComponent } from './room-create/room-create.component';
import { RoomEditComponent } from './room-edit/room-edit.component';
import { RoomDeleteComponent } from './room-delete/room-delete.component';
import { SeatListComponent } from './seat-list/seat-list.component';
import { SeatCreateComponent } from './seat-create/seat-create.component';
import { SeatEditComponent } from './seat-edit/seat-edit.component';
import { SeatDeleteComponent } from './seat-delete/seat-delete.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [RoomListComponent, RoomCreateComponent, RoomEditComponent, RoomDeleteComponent, SeatListComponent, SeatCreateComponent, SeatEditComponent, SeatDeleteComponent],
    imports: [
        CommonModule,
        AdminRoomManagementRoutingModule,
        HttpClientModule,
        ToastrModule,
        ReactiveFormsModule,
        RouterModule,
        FormsModule,
    ]
})
export class AdminRoomManagementModule { }
