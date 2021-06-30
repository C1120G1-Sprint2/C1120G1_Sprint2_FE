import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
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
import {LoadingComponent} from './module/loading/loading.component';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {FacebookLoginProvider} from 'angularx-social-login';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';

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
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    SocialLoginModule,
  ],
  // providers: [],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('310277720766688')
        }
      ]
    } as SocialAuthServiceConfig}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
