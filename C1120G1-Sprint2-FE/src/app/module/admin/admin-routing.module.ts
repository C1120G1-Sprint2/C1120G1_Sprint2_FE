import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminPageComponent} from './admin-page/admin-page.component';


const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: 'employee',
        // tslint:disable-next-line:max-line-length
        loadChildren: () => import('./admin-employee-management/admin-employee-management.module').then(module => module.AdminEmployeeManagementModule)
      },
      {
        path: 'room',
        loadChildren: () => import('./admin-room-management/admin-room-management.module').then(module => module.AdminRoomManagementModule)
      },
      {
        path: 'movie',
        // tslint:disable-next-line:max-line-length
        loadChildren: () => import('./admin-movie-management/admin-movie-management.module').then(module => module.AdminMovieManagementModule)
      },
      {
        path: 'statistical',
        // tslint:disable-next-line:max-line-length
        loadChildren: () => import('./admin-statistical-management/admin-statistical-management.module').then(module => module.AdminStatisticalManagementModule)
      },
      {path: '', redirectTo: '', pathMatch: 'full'},
      {path: '**', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
