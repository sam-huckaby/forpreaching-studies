import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*
 * The routes for the illustration app.
 * This is the root routing module, so it will only container pointers to features and shared areas
 */
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./features/create/create.module').then(m => m.CreateModule)
  },
  {
    path: 'illustration',
    loadChildren: () => import('./features/illustration/illustration.module').then(m => m.IllustrationModule)
  },
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
