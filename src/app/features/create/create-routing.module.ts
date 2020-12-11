// Libraries
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Core Modules
import { LoginGuardGuard } from '../../core/guards/login-guard.guard';
// Feature Modules
import { CreateComponent } from './create.component';

// Child-routes for the feature
const routes: Routes = [
    {
        path: '',
        component: CreateComponent,
        pathMatch: 'full',
        canActivate: [LoginGuardGuard]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule { }
