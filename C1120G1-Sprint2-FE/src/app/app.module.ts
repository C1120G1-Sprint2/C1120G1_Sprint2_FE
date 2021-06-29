import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EmployeeModule} from './module/employee/employee.module';
import {MemberModule} from './module/member/member.module';
import {MainModule} from './module/main/main.module';
import {SecurityModule} from './module/security/security.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../environments/environment';
import {LoadingComponent} from './module/loading/loading.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {AdminMovieManagementModule} from './module/admin/admin-movie-management/admin-movie-management.module';
import {AdminModule} from './module/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],

  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    HttpClientModule,
    ToastrModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    EmployeeModule,
    MemberModule,
    MainModule,
    SecurityModule,
    BrowserAnimationsModule,
    AdminMovieManagementModule,
    AdminModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
