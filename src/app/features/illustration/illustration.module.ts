import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// 3rd Party libraries
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IllustrationRoutingModule } from './illustration-routing.module';
import { IllustrationComponent, ConfirmDeleteDialog } from './illustration.component';

@NgModule({
  declarations: [
    IllustrationComponent,
    ConfirmDeleteDialog
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IllustrationRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    FontAwesomeModule,
  ],
  entryComponents: [
    ConfirmDeleteDialog
  ],
})
export class IllustrationModule { }