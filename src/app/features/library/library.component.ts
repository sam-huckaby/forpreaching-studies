import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Illustration } from '../../core/interfaces/illustration.interface';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  // Observables
  yourIllustrations$: BehaviorSubject<Illustration[]> = new BehaviorSubject([]);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    // Retrieve all illustrations created by the current user
    this.isLoading$.next(true);
    this.http.get<Illustration[]>('/api/illustrations/library', {responseType: 'json'})
      .subscribe((illustrations) => {
        this.yourIllustrations$.next(illustrations);
      }, (caught) => {
        this._snackBar.open(caught.error.info, "Got it", {
          duration: 5000,
        });
      },
      () => {
        // Always stop the loading veil
        this.isLoading$.next(false);
      });
  }
}
