import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

// 3rd Party libraries
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditorModule } from '@tinymce/tinymce-angular';

// Routing
import { CreateRoutingModule } from './create-routing.module';
// Components
import { CreateComponent } from './create.component';
import { AddStudyDialog } from './dialogs/addStudyDialog.component';
import { AddPassageDialog } from './dialogs/addPassageDialog.component';

@NgModule({
  declarations: [
    AddStudyDialog,
    AddPassageDialog,
    CreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FontAwesomeModule,
    EditorModule,
  ]
})
export class CreateModule { }
