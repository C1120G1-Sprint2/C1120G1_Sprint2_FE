import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeePageComponent} from './employee-page/employee-page.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeePageComponent,
    children: [
      {
        path: 'book/tickets',
        // tslint:disable-next-line:max-line-length
        loadChildren: () => import('./employee-book-tickets-management/employee-book-tickets-management.module').then(module => module.EmployeeBookTicketsManagementModule)
      },
      {
        path: 'sale/tickets',
        // tslint:disable-next-line:max-line-length
        loadChildren: () => import('./employee-sales-tickets-management/employee-sales-tickets-management.module').then(module => module.EmployeeSalesTicketsManagementModule)
      },
      {
        path: 'member/management',
        // tslint:disable-next-line:max-line-length
        loadChildren: () => import('./employee-member-management/employee-member-management.module').then(module => module.EmployeeMemberManagementModule)
      },
      {path: '', redirectTo: 'sale/tickets', pathMatch: 'full'},
      {path: '**', redirectTo: 'sale/tickets', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
