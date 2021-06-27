import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainHomePageComponent} from './module/main/main-home-page/main-home-page.component';
import {RegisterComponent} from './module/security/register/register.component';
import {LoginComponent} from './module/security/login/login.component';
import {LogoutComponent} from './module/security/logout/logout.component';
import {MainContentComponent} from "./module/main/main-content/main-content.component";
import {MainSearchComponent} from "./module/main/main-search/main-search.component";


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./module/admin/admin.module').then(module => module.AdminModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./module/employee/employee.module').then(module => module.EmployeeModule)
  },
  {
    path: '',
    component: MainHomePageComponent,
    children: [
      {path: '', component: MainContentComponent},
      {path: 'search', component: MainSearchComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
