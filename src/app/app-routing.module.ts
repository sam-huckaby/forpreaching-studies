import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
// import { IllustrationComponent } from './illustration/illustration.component';
// import { DashboardComponent } from './dashboard/dashboard.component'

/*
 * The routes for the illustration app.
 * This is the root routing module, so it will only container pointers to features and shared areas
 */
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    pathMatch: 'full'
  },
  {
    path: 'create',
    loadChildren: () => import('./features/create/create.module').then(m => m.CreateModule),
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: '**',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
