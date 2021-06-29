import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './module/admin/admin.module';
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
import { AdminMovieManagementModule} from './module/admin/admin-movie-management/admin-movie-management.module';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],

    imports: [
        BrowserModule,
        AppRoutingModule,
        AdminModule,
        EmployeeModule,
        MemberModule,
        MainModule,
        SecurityModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        AdminMovieManagementModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
