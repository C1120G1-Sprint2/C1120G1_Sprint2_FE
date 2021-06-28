import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {MainHomePageComponent} from './main-home-page/main-home-page.component';
import {MainHeaderComponent} from './main-header/main-header.component';
import {MainFooterComponent} from './main-footer/main-footer.component';
import {MainContentComponent} from './main-content/main-content.component';
import {MovieTrailerComponent} from './movie-trailer/movie-trailer.component';
import {MainSearchComponent} from './main-search/main-search.component';
import {AppRoutingModule} from '../../app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';
import { DetailMovieComponent } from './detail-movie/detail-movie.component';
import { CreateCommentComponent } from './comment/create-comment/create-comment.component';
import { DeleteCommentComponent } from './comment/delete-comment/delete-comment.component';
import { EditCommentComponent } from './comment/edit-comment/edit-comment.component';
import { RatingComponent } from './rating/rating.component';
import { PriceTicketClientComponent } from './price-ticket-client/price-ticket-client.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  declarations: [MainHomePageComponent, MainHeaderComponent, MainFooterComponent,
    MainContentComponent, DetailMovieComponent, CreateCommentComponent, DeleteCommentComponent,
    EditCommentComponent, RatingComponent, PriceTicketClientComponent, MovieTrailerComponent, MainSearchComponent],
  exports: [
    MainHeaderComponent,
    MainFooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ]
})

export class MainModule {
}
