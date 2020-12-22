import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// 3rd Party libraries
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IllustrationRoutingModule } from './illustration-routing.module';
import { IllustrationComponent } from './illustration.component';

@NgModule({
  declarations: [
    IllustrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IllustrationRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FontAwesomeModule,
  ]
})
export class IllustrationModule { }