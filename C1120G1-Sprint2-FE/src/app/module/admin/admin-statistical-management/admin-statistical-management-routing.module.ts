import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieStatisticsComponent } from './movie-statistics/movie-statistics.component';


const routes: Routes = [
  { path: 'movie', component: MovieStatisticsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStatisticalManagementRoutingModule { }
