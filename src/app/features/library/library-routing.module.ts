// Libraries
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Feature Modules
import { LibraryComponent } from './library.component';
// Authentication Module
import { AuthGuard } from '@auth0/auth0-angular';

// Child-routes for the feature
const routes: Routes = [
    {
        path: '',
        component: LibraryComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
