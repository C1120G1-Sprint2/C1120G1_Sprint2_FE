import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import {EmployeeMemberManagementModule} from './employee-member-management/employee-member-management.module';
import {FormsModule} from '@angular/forms';
import {MainModule} from '../main/main.module';
import {EmployeeSalesTicketsManagementModule} from "./employee-sales-tickets-management/employee-sales-tickets-management.module";
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [EmployeePageComponent ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    EmployeeMemberManagementModule,
    FormsModule,
    MainModule,
    EmployeeSalesTicketsManagementModule,
    RouterModule
  ]
})
export class EmployeeModule { }
