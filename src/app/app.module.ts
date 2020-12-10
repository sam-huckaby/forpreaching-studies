// Angular libraries
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';

// 3rd Party libraries
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Do all of the app routing in a separate place
import { AppRoutingModule } from './app-routing.module';
// Load the app root
import { AppComponent } from './app.component';

// Core Module
import { CoreModule } from './core/core.module';

// Custom components (Maybe I don't need these anymore here)
import { LoginComponent } from './login/login.component';

// Load the root module
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
