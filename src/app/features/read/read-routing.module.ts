import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Feature Modules
import { ReadComponent } from './read.component';
// Authentication Module
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: ReadComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadRoutingModule { }
