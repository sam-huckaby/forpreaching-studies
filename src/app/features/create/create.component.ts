import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { environment } from '../../../environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
import { share, tap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@auth0/auth0-angular';

import { faPlus, faFileAlt, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import { Sermon } from '../../core/interfaces/sermon.interface';
import { Guide } from '../../core/interfaces/guide.interface';
import { Study } from '../../core/interfaces/study.interface';

import { AddStudyDialog } from './dialogs/addStudyDialog.component';
import { AddPassageDialog } from './dialogs/addPassageDialog.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  // The form itself
  @ViewChild('createGuideForm') createForm;

  faPlus = faPlus;
  faFileAlt = faFileAlt;
  faArrowUp = faArrowUp;

  // Observables
  sermonId: string;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  studyForm: FormGroup;
  userId: number;
  sermon$: Observable<Sermon>;
  studies: Study[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // Display loading veil
    this.isLoading$.next(true);

    this.studyForm = this.formBuilder.group({
      title: ['', Validators.required],
      introduction: ['', [Validators.required, Validators.maxLength(100000)]],
      instructions: ['', Validators.maxLength(100000)]
    });

    // Retrieve the route params so we can get the user and then the illustration
    this.route.params.subscribe(params => {
      // Grab and save the sermon identifier
      this.sermonId = params['id'];

      // Retrieve the user information from Auth0
      this.auth.user$.subscribe((user) => {
        // Once we have the user, we can grab the illustration from the DB
        this.userId = user.sub;
        this.sermon$ = this.http.get<Sermon>('/api/sermons/'+params['id'], {responseType: 'json'}).pipe(
          share()
        );

        // Stop loading when the sermon comes back
        this.sermon$.subscribe(() => {
          this.isLoading$.next(false);
        });
      });
    });
  }

  editStudy(existingStudy): void {
    // Add a new study to the study array via dialog
    let addStudyDialogRef = this.dialog.open(AddStudyDialog, {});

    // Wait to hear back from the user before deleting
    addStudyDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // If a study was added
      if(result) {
        // Add the new study to the studies array
        this.studies.push(result);
      } else {
        // Cancelled adding the new study
        // Stop displaying the loading veil no matter what
        this.isLoading$.next(false);
      }
    });
  }

  addPassage(studyIndex): void {
    // Add a new study to the study array via dialog
    let addPassageDialogRef = this.dialog.open(AddPassageDialog, {});

    // Wait to hear back from the user before deleting
    addPassageDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // If a study was added
      if(result) {
        // Add the new study to the studies array
        this.studies[studyIndex].passages.push(result);
      } else {
        // Cancelled adding the new study
        // Stop displaying the loading veil no matter what
        this.isLoading$.next(false);
      }
    });
  }

  clipPassage(passage): string {
    return passage.replace( /(<([^>]+)>)/ig, '').replace(/&nbsp;/ig, ' ').replace(/&ldquo;/ig, "'").replace(/&rsquo;/ig, "'").replace(/&lsquo;/ig, "'").replace(/&rdquo;/ig, "'");
  }

  onSubmit(): void {
    // Add the sermon ID to the guide's data
    let guideData = this.studyForm.value;
    guideData.sermon = this.sermonId;
    guideData.studies = this.studies;

    // Attempt to create a new study
    this.http.post<Guide>('/api/guides', guideData, {responseType: 'json'}).subscribe((result) => {
      console.log(result);
      // Navigate the user to a reader's view of the new study guide to preview
      // this.router.navigate(['/read/', result._id]);
    });
  }
}