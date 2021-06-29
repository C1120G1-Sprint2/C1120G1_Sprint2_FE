import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMovieManagementRoutingModule } from './admin-movie-management-routing.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    AdminMovieManagementRoutingModule
  ]
})
export class AdminMovieManagementModule { }
