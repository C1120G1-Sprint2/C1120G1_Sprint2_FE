import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import {AdminRoomManagementModule} from './admin-room-management/admin-room-management.module';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { MainModule } from '../main/main.module';


@NgModule({
  declarations: [AdminPageComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminRoomManagementModule,
    HttpClientModule,
    ToastrModule,
    MainModule,
  ]
})
export class AdminModule { }
