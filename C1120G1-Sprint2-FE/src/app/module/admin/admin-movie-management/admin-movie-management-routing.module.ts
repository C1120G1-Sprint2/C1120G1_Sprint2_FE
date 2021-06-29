import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddMovieComponent} from './add-movie/add-movie.component';
import {EditMovieComponent} from './edit-movie/edit-movie.component';
import {MovieListComponent} from './movie-list/movie-list.component';


const routes: Routes = [
  {path: 'add-movie', component: AddMovieComponent},
  {path: 'edit-movie/:movieId', component: EditMovieComponent},
  {path: 'movie-list', component: MovieListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMovieManagementRoutingModule { }
