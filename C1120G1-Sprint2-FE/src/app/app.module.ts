import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AdminModule} from './module/admin/admin.module';
import {EmployeeModule} from './module/employee/employee.module';
import {MemberModule} from './module/member/member.module';
import {MainModule} from './module/main/main.module';
import {SecurityModule} from './module/security/security.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import { LoadingComponent } from './module/loading/loading.component';
import {ToastrModule} from 'ngx-toastr';
import {AdminMovieTicketModule} from './module/admin/admin-movie-ticket/admin-movie-ticket.module';
import {HttpClientModule} from '@angular/common/http';

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
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    AdminMovieTicketModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
