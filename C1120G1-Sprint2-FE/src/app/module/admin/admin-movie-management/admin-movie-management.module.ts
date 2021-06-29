import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMovieManagementRoutingModule } from './admin-movie-management-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule, ToastrService} from 'ngx-toastr';


@NgModule({
  declarations: [MovieListComponent, AddMovieComponent, EditMovieComponent],
  exports: [
    MovieListComponent,
    EditMovieComponent,
    AddMovieComponent
  ],
    imports: [
        CommonModule,
        AdminMovieManagementRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot(),
    ]
})
export class AdminMovieManagementModule { }
