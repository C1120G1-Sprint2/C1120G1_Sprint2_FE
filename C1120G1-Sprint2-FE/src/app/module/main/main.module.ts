import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainHomePageComponent} from './main-home-page/main-home-page.component';
import {MainHeaderComponent} from './main-header/main-header.component';
import {MainFooterComponent} from './main-footer/main-footer.component';
import {MainContentComponent} from './main-content/main-content.component';
import {AppRoutingModule} from '../../app-routing.module';
import {MovieTrailerComponent} from './movie-trailer/movie-trailer.component';
import {MainSearchComponent} from './main-search/main-search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MovieCornerComponent } from './movie-corner/movie-corner.component';
import { MainEventsComponent } from './main-events/main-events.component';
import { MainInstructionsComponent } from './main-instructions/main-instructions.component';
import { MainPolicyComponent } from './main-policy/main-policy.component';
import {AdminRoutingModule} from '../admin/admin-routing.module';

@NgModule({
  declarations: [MainHomePageComponent, MainHeaderComponent, MainFooterComponent, MainContentComponent, MovieTrailerComponent, MainSearchComponent, MovieCornerComponent, MainEventsComponent, MainInstructionsComponent, MainPolicyComponent],
  exports: [
    MainHeaderComponent,
    MainFooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class MainModule {
}
