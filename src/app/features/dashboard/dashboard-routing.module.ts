// Libraries
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Authentication Module
import { AuthGuard } from '@auth0/auth0-angular';
// Feature Modules
import { DashboardComponent } from './dashboard.component';

// Child-routes for the feature
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
