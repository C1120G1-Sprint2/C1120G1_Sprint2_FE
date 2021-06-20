import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieSelectionComponent} from './movie-selection/movie-selection.component';
import {SeatSelectionComponent} from './seat-selection/seat-selection.component';


const routes: Routes = [
  {path: '', component: MovieSelectionComponent},
  {path: 'seat', component: SeatSelectionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeSalesTicketsManagementRoutingModule { }
