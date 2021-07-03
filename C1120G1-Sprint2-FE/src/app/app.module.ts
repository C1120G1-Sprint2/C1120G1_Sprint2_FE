
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeModule } from './module/employee/employee.module';
import { MemberModule } from './module/member/member.module';
import { MainModule } from './module/main/main.module';
import { SecurityModule } from './module/security/security.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { LoadingComponent } from './module/loading/loading.component';

import {DatePipe} from '@angular/common';
import {BookingModule} from './module/booking/booking.module';
import {AdminMovieTicketModule} from './module/admin/admin-movie-ticket/admin-movie-ticket.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminMovieManagementModule} from './module/admin/admin-movie-management/admin-movie-management.module';



@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
  ],

  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    EmployeeModule,
    MemberModule,
    MainModule,
    SecurityModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BookingModule,
    BrowserAnimationsModule,
    AdminMovieTicketModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgbModule,
    AdminMovieManagementModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}


