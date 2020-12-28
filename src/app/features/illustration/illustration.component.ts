import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Location } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable } from 'rxjs';

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
  delete$: Observable<boolean>
  userId: String;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  illustration$: BehaviorSubject<Illustration> = new BehaviorSubject({} as Illustration);

  readTime: Number;

  constructor(
    private http: HttpClient,
    private location: Location,
    private route: ActivatedRoute,
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  deleteIllustration(): void {
    // Display loading veil
    this.isLoading$.next(true);

    // Open a simple dialog to confirm that the user wants to delete the illustration
    let confirmDeleteDialogRef = this.dialog.open(ConfirmDeleteDialog, {});

    // Wait to hear back from the user before deleting
    confirmDeleteDialogRef.afterClosed().subscribe(result => {
      if(result) {
        // Make the request to Node to actually delete the illustration
        this.http.delete<boolean>('/api/illustrations/'+this.illustrationId, {responseType: 'json'})
        .subscribe((success) => {
          // If the illustration was deleted, navigate back to the last page the user was on
          this.location.back();
        }, (caught) => {
          // Open a Material Snackbar
          this._snackBar.open(caught.error.info, "Got it", {
            duration: 5000,
          });
        }, () => {
          // Stop displaying the loading veil no matter what
          this.isLoading$.next(false);
        });
      } else {
        // Stop displaying the loading veil no matter what
        this.isLoading$.next(false);
      }
    });
  }

  resetChanges(): void {
    // Reset the form to the last illustration value
    this.illustrationForm.reset(this.illustration$.getValue());
  }

  saveChanges(): void {
    // Display loading veil
    this.isLoading$.next(true);

    // Send the request to save the form's data
    this.http.put<Illustration>('/api/illustrations/'+this.illustrationId, this.illustrationForm.value, {responseType: 'json'})
    .subscribe((illustration) => {
      // Once we have the illustration, populate the data management BehaviorSubject
      this.illustration$.next(illustration);
      // Mark the form as pristine again
      this.illustrationForm.markAsPristine();
    }, (caught) => {
      this._snackBar.open(caught.error.info, "Got it", {
        duration: 5000,
      });
    }, () => {
      // Stop displaying the loading veil
      this.isLoading$.next(false);
    })
  }

  updateReadingTime() {
    // Is this the right place to do this? Will it be too time intensive with a large illustration?
    this.readTime = Math.ceil(((this.illustrationForm.value.body.split(' ')).length/125)*60);
  }

  ngOnInit(): void {
    this.illustrationForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });

    // Display loading veil
    this.isLoading$.next(true);

    // Anytime the current illustration changes, patch the form to match
    this.illustration$.subscribe((newValue) => {
      this.illustrationForm.patchValue(newValue);
      // A quick calculation using an average reading time of 125 WPM
      this.readTime = Math.ceil(((this.illustrationForm.value.body.split(' ')).length/125)*60);
    });

    // Retrieve the route params so we can get the user and then the illustration
    this.route.params.subscribe(params => {
      // Retrieve the user information from Auth0
      this.auth.user$.subscribe((user) => {
        // Once we have the user, we can grab the illustration from the DB
        this.userId = user.sub;
        this.http.get<Illustration>('/api/illustrations/'+params['id'], {responseType: 'json'})
        .subscribe((illustration) => {
          // Once we have the illustration, populate the data management BehaviorSubject
          this.illustration$.next(illustration);
          // Keep track of this illustration's ID
          this.illustrationId = illustration._id;
        }, (caught) => {
          this._snackBar.open(caught.error.info, "Got it", {
            duration: 5000,
          });
        }, () => {
          // Stop displaying the loading veil no matter what
          this.isLoading$.next(false);
        });
      });
    });
  }
}

// Pretty simple dialog, so I'm just embedding it here
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