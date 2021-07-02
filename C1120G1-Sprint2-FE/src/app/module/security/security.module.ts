import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainModule} from '../main/main.module';
import {HttpClientModule} from '@angular/common/http';
import { LoginGoogleComponent } from './login-google/login-google.component';


@NgModule({
  declarations: [RegisterComponent, LoginComponent, LogoutComponent, LoginGoogleComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MainModule,
    FormsModule,
    HttpClientModule
  ]
})
export class SecurityModule {
}
