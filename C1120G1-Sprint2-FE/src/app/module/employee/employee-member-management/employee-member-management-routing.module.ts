import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeListUserComponent} from './employee-list-user/employee-list-user.component';


const routes: Routes = [
  {
    path: '' , component : EmployeeListUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeMemberManagementRoutingModule { }
