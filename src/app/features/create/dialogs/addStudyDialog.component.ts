import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'studies-addStudyDialog',
    templateUrl: './addStudyDialog.component.html',
    styleUrls: ['./addStudyDialog.component.scss']
})
export class AddStudyDialog {

    @ViewChild('createStudyForm') createForm;

    studyForm = this.formBuilder.group({
        caption: ['', [Validators.required, Validators.maxLength(200)]],
        scripture: ['', [Validators.required, Validators.maxLength(1000)]],
      });
    
    constructor(
        public dialogRef: MatDialogRef<AddStudyDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder
    ) {}

    onAddClick(): void {
        let studyInfo = this.studyForm.value;
        studyInfo.passages = [];
        this.dialogRef.close(studyInfo);
    }

}