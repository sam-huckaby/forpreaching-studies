// Libraries
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Core Modules
import { LoginGuardGuard } from '../../core/guards/login-guard.guard';
// Feature Modules
import { DashboardComponent } from './dashboard.component';

// Child-routes for the feature
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [LoginGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
