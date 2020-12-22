import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { share, tap } from 'rxjs/operators';
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
  illustration$: Observable<Illustration>;
  userId: String;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public auth: AuthService,
    private formBuilder: FormBuilder) { }

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
            this.illustrationForm.patchValue(illustration);
          })
        );
      });
    });
  }
}