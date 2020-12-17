import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Get the environment variables
import { environment } from '../../environments/environment';

// Load custom interceptors
import { API_URL, ApiUrlInterceptor } from './interceptors/apiUrl.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    // Interceptor to apply API url to all relative requests that start with /api
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true, deps: [API_URL] },
  ]
})
export class CoreModule { }
