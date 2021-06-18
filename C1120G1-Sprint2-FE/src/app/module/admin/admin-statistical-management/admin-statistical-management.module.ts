import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminStatisticalManagementRoutingModule } from './admin-statistical-management-routing.module';
import {ChartModule} from 'primeng/chart';
import { MovieStatisticsComponent } from './movie-statistics/movie-statistics.component';
import { FormsModule } from '@angular/forms';
import { MemberStatisticsComponent } from './member-statistics/member-statistics.component';
import { CategoryStatisticsComponent } from './category-statistics/category-statistics.component';
import { ShowtimeStatisticsComponent } from './showtime-statistics/showtime-statistics.component';


@NgModule({
  declarations: [MovieStatisticsComponent, MemberStatisticsComponent, CategoryStatisticsComponent, ShowtimeStatisticsComponent],
  imports: [
    CommonModule,
    AdminStatisticalManagementRoutingModule,
    ChartModule,
    FormsModule
  ]
})
export class AdminStatisticalManagementModule { }
