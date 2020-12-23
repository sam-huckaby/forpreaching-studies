import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Location } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { share, tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Illustration } from '../../core/interfaces/illustration.interface';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-illustration',
  templateUrl: './illustration.component.html',
  styleUrls: ['./illustration.component.scss']
})
export class IllustrationComponent implements OnInit {
  // The form itself
  @ViewChild('editIllustrationForm') editForm;

  faTrash = faTrash;

  illustrationForm: FormGroup;
  illustrationId: String;
  illustration$: Observable<Illustration>;
  original: Illustration;
  delete$: Observable<boolean>
  save$: Observable<Illustration>;
  isDeleting: boolean = false;
  isSaving: boolean = false;
  userId: String;

  constructor(
    private http: HttpClient,
    private location: Location,
    private route: ActivatedRoute,
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  deleteIllustration(): void {
    let confirmDeleteDialogRef = this.dialog.open(ConfirmDeleteDialog, {});
    confirmDeleteDialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.isDeleting = true;
        // Make the request to Node to actually delete the illustration
        this.http.delete<boolean>('/api/illustrations/'+this.illustrationId, {responseType: 'json'})
        .subscribe((success) => {
          this.location.back();
        });
      }
    });
  }

  resetChanges(): void {
    this.illustrationForm.reset(this.original);
  }

  saveChanges(): void {
    this.isSaving = true;
    // Send the request to save the form's data
    this.save$ = this.http.put<Illustration>('/api/illustrations/'+this.illustrationId, this.illustrationForm.value, {responseType: 'json'}).pipe(share());
    this.save$.subscribe((illustration) => {
      this.original = illustration;
      this.resetChanges();
    }, (caught) => {
      this._snackBar.open(caught.error.info, "Got it", {
        duration: 5000,
      });
    }, () => {
      // Remove the loading veil no matter what
      this.isSaving = false;
    })
  }

  ngOnInit(): void {
    this.illustrationForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });

    this.route.params.subscribe(params => {

      // Retrieve the user information from Auth0
      this.auth.user$.subscribe((user) => {
        // Once we have the user, we can grab the illustration from the DB
        this.userId = user.sub;
        this.illustration$ = this.http.get<Illustration>('/api/illustrations/'+params['id'], {responseType: 'json'})
        .pipe(
          share(),
          tap((illustration) => {
            this.illustrationId = illustration._id;
            this.original = illustration;
            this.illustrationForm.patchValue(illustration);
          })
        );
      });
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: ` <h2 mat-dialog-title>Delete this illustration?</h2>
              <mat-dialog-content>This will delete the current illustration and cannot be undone.</mat-dialog-content>
              <mat-dialog-actions>
                <button mat-button [mat-dialog-close]="false">Cancel</button>
                <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
                <button mat-button [mat-dialog-close]="true" color="warn">Delete</button>
              </mat-dialog-actions>`,
})
export class ConfirmDeleteDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}