// Angular libraries
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';

// Authentication Module
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';

// Load the current environment
import { environment } from '../environments/environment';

// 3rd Party libraries
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Do all of the app routing in a separate place
import { AppRoutingModule } from './app-routing.module';
// Load the app root
import { AppComponent } from './app.component';

// Core Module
import { CoreModule } from './core/core.module';

// Load the root module
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'for-preaching.us.auth0.com',
      clientId: 'dx1sPXUS9Gu54L5ksXE6q5wKdwfUewLG',
      redirectUri: window.location.origin,
      // Request this audience at user authentication time
      audience: 'https://for-preaching.com/',
      
      // The AuthHttpInterceptor configuration
      httpInterceptor: {
        allowedList: [
          // Attach access tokens to any calls that start with '/api/'
          environment.apiUrl+'/api/*',

          // Match anything starting with /api/accounts, but also specify the audience and scope the attached
          // access token must have
          // {
          //   uri: '/api/accounts/*',
          //   tokenOptions: {
          //     audience: 'http://my-api/',
          //     scope: 'read:accounts',
          //   },
          // },

          // Matching on HTTP method
          // {
          //   uri: '/api/orders',
          //   httpMethod: 'post',
          //   tokenOptions: {
          //     audience: 'http://my-api/',
          //     scope: 'write:orders',
          //   },
          // },

          // Using an absolute URI
          // {
          //   uri: 'https://your-domain.auth0.com/api/v2/users',
          //   tokenOptions: {
          //     audience: 'https://your-domain.com/api/v2/',
          //     scope: 'read:users',
          //   },
          // },
        ],
      },
    }),
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatRadioModule,
    MatToolbarModule,
    MatSliderModule,
    CoreModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
