import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import {EmployeeMemberManagementModule} from './employee-member-management/employee-member-management.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [EmployeePageComponent ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    EmployeeMemberManagementModule,
    FormsModule
  ]
})
export class EmployeeModule { }
