import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminStatisticalManagementRoutingModule } from './admin-statistical-management-routing.module';
import {ChartModule} from 'primeng/chart';
import { MovieStatisticsComponent } from './movie-statistics/movie-statistics.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [MovieStatisticsComponent],
  imports: [
    CommonModule,
    AdminStatisticalManagementRoutingModule,
    ChartModule,
    FormsModule
  ]
})
export class AdminStatisticalManagementModule { }
