import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeListUserComponent} from './employee-list-user/employee-list-user.component';
import {EmployeeCreateUserComponent} from './employee-create-user/employee-create-user.component';
import {EmployeeEditUserComponent} from './employee-edit-user/employee-edit-user.component';


const routes: Routes = [
  {
    path: '' , component : EmployeeListUserComponent
  },
  {
    path: 'create' , component : EmployeeCreateUserComponent
  },
  {
    path: 'edit/:id' , component : EmployeeEditUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeMemberManagementRoutingModule { }
