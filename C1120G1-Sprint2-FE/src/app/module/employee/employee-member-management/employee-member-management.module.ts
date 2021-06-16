import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeMemberManagementRoutingModule } from './employee-member-management-routing.module';
import { EmployeeListUserComponent } from './employee-list-user/employee-list-user.component';
import {MatSortModule} from '@angular/material/sort';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [EmployeeListUserComponent],
  imports: [
    CommonModule,
    EmployeeMemberManagementRoutingModule,
    MatSortModule,
    FormsModule,
  ]
})
export class EmployeeMemberManagementModule { }
