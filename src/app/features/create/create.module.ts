import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';

@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CreateModule { }
