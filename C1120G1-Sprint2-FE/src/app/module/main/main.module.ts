import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainHomePageComponent} from './main-home-page/main-home-page.component';
import {MainHeaderComponent} from './main-header/main-header.component';
import {MainFooterComponent} from './main-footer/main-footer.component';
import {MainContentComponent} from './main-content/main-content.component';
import { DetailMovieComponent } from './detail-movie/detail-movie.component';



@NgModule({
  declarations: [MainHomePageComponent, MainHeaderComponent, MainFooterComponent, MainContentComponent, DetailMovieComponent],
  imports: [
    CommonModule
  ]
})
export class MainModule { }
