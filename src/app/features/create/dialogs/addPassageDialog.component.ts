import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'studies-addPassageDialog',
    templateUrl: './addPassageDialog.component.html',
    styleUrls: ['./addPassageDialog.component.scss']
})
export class AddPassageDialog {

    @ViewChild('createPassageForm') createForm;

    passageForm = this.formBuilder.group({
        body: ['', [Validators.required, Validators.maxLength(100000)]],
        reflection: ['', [Validators.maxLength(2000)]],
      });
    
    constructor(
        public dialogRef: MatDialogRef<AddPassageDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder
    ) {}

    onAddClick(): void {
        let passageInfo = this.passageForm.value;
        this.dialogRef.close(passageInfo);
    }

}