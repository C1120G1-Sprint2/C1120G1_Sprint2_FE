import {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {ListMovieTicketManagementComponent} from './list-movie-ticket-management/list-movie-ticket-management.component';
import {CreateMovieTicketManagementComponent} from './create-movie-ticket-management/create-movie-ticket-management.component';
import {EditMovieTicketManagementComponent} from './edit-movie-ticket-management/edit-movie-ticket-management.component';
import {DeleteMovieTicketManagementComponent} from './delete-movie-ticket-management/delete-movie-ticket-management.component';

const routes: Routes = [
  {path: '', component: ListMovieTicketManagementComponent},
  {path: 'create', component: CreateMovieTicketManagementComponent},
  {path: 'edit/:id', component: EditMovieTicketManagementComponent},
  {path: 'delete/:id', component: DeleteMovieTicketManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMovieTicketRoutingModule { }
