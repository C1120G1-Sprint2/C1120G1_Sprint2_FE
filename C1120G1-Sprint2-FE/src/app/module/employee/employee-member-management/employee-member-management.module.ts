import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeMemberManagementRoutingModule } from './employee-member-management-routing.module';
import { EmployeeListUserComponent } from './employee-list-user/employee-list-user.component';
import {MatSortModule} from '@angular/material/sort';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmployeeCreateUserComponent } from './employee-create-user/employee-create-user.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { EmployeeEditUserComponent } from './employee-edit-user/employee-edit-user.component';
import { EmployeeDeleteUserComponent } from './employee-delete-user/employee-delete-user.component';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [EmployeeListUserComponent, EmployeeCreateUserComponent, EmployeeEditUserComponent, EmployeeDeleteUserComponent],
    imports: [
        CommonModule,
        EmployeeMemberManagementRoutingModule,
        MatSortModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatRadioModule,
        MatPaginatorModule,
    ]
})
export class EmployeeMemberManagementModule { }
