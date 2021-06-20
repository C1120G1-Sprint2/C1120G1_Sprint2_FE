import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import {EmployeeSalesTicketsManagementModule} from './employee-sales-tickets-management/employee-sales-tickets-management.module';


@NgModule({
  declarations: [EmployeePageComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    EmployeeSalesTicketsManagementModule
  ]
})
export class EmployeeModule { }
