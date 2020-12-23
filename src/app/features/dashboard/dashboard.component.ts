import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Illustration } from '../../core/interfaces/illustration.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // The form itself
  @ViewChild('dashboardForm') dashboardForm;

  // Icons
  faSearch = faSearch;

  // FormGroup
  dashboardFormGroup: FormGroup;
  search$: Observable<Illustration[] | ArrayBuffer>;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  search(): void {
    // Look for illustrations using provided criteria
    console.log('SEARCH');
    this.search$ = this.http.get<Illustration[]>('/api/illustrations', {responseType: 'json', params: this.dashboardForm.value}).pipe(share());
  }

  ngOnInit(): void {
    this.dashboardFormGroup = this.formBuilder.group({
      title: [''],
      body: ['']
    });
  }
}
