import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Location } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable } from 'rxjs';

import { Guide } from '../../core/interfaces/guide.interface';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'forpreaching-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {
  // The form itself
  @ViewChild('editReadForm') editForm;

  faTrash = faTrash;

  readForm: FormGroup;
  guideId: String;
  delete$: Observable<boolean>
  userId: String;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  guide$: BehaviorSubject<Guide> = new BehaviorSubject({} as Guide);

  readTime: Number;

  constructor(
    private http: HttpClient,
    private location: Location,
    private route: ActivatedRoute,
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  deleteGuide(): void {
    // Display loading veil
    this.isLoading$.next(true);

    // Open a simple dialog to confirm that the user wants to delete the guide
    let confirmDeleteDialogRef = this.dialog.open(ConfirmDeleteDialog, {});

    // Wait to hear back from the user before deleting
    confirmDeleteDialogRef.afterClosed().subscribe(result => {
      if(result) {
        // Make the request to Node to actually delete the guide
        this.http.delete<boolean>('/api/guides/'+this.guideId, {responseType: 'json'})
        .subscribe((success) => {
          // If the guide was deleted, navigate back to the last page the user was on
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
    // Reset the form to the last guide value
    this.readForm.reset(this.guide$.getValue());
  }

  saveChanges(): void {
    // Display loading veil
    this.isLoading$.next(true);

    // Send the request to save the form's data
    this.http.put<Guide>('/api/guides/'+this.guideId, this.readForm.value, {responseType: 'json'})
    .subscribe((guide) => {
      // Once we have the guide, populate the data management BehaviorSubject
      this.guide$.next(guide);
      // Mark the form as pristine again
      this.readForm.markAsPristine();
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
    // Is this the right place to do this? Will it be too time intensive with a large guide?
    this.readTime = Math.ceil(((this.readForm.value.body.split(' ')).length/125)*60);
  }

  ngOnInit(): void {
    this.readForm = this.formBuilder.group({
      title: ['', Validators.required],
      scripture: ['', Validators.required],
      summary: [''],
      body: ['', Validators.required]
    });

    // Display loading veil
    this.isLoading$.next(true);

    // Anytime the current guide changes, patch the form to match
    this.guide$.subscribe((newValue) => {
      this.readForm.patchValue(newValue);
      // A quick calculation using an average reading time of 125 WPM
      this.readTime = Math.ceil(((this.readForm.value.body.split(' ')).length/125)*60);
    });

    // Retrieve the route params so we can get the user and then the guide
    this.route.params.subscribe(params => {
      // Retrieve the user information from Auth0
      this.auth.user$.subscribe((user) => {
        // Once we have the user, we can grab the guide from the DB
        this.userId = user.sub;
        this.http.get<Guide>('/api/guides/'+params['id'], {responseType: 'json'})
        .subscribe((guide) => {
          // Once we have the guide, populate the data management BehaviorSubject
          this.guide$.next(guide);
          // Keep track of this guide's ID
          this.guideId = guide._id;
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
  template: ` <h2 mat-dialog-title>Delete this guide?</h2>
              <mat-dialog-content>
                <p>This will delete the current guide and cannot be undone.</p>
                <p>A deleted guide can no longer be opened or read.</p>
              </mat-dialog-content>
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