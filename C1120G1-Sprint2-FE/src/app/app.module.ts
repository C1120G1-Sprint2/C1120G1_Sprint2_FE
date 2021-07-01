import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DatePipe} from '@angular/common';
import {AdminModule} from './module/admin/admin.module';
import {EmployeeModule} from './module/employee/employee.module';
import {MemberModule} from './module/member/member.module';
import {MainModule} from './module/main/main.module';
import {SecurityModule} from './module/security/security.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';

import { LoadingComponent } from './module/loading/loading.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {BookingModule} from './module/booking/booking.module';
import {ToastrModule} from 'ngx-toastr';
import {AdminMovieTicketModule} from './module/admin/admin-movie-ticket/admin-movie-ticket.module';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminMovieManagementModule} from './module/admin/admin-movie-management/admin-movie-management.module';



@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    EmployeeModule,
    MemberModule,
    MainModule,
    SecurityModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BookingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AdminMovieTicketModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgbModule,
    AdminMovieManagementModule,
    NgbModule,
    RouterModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//sss
