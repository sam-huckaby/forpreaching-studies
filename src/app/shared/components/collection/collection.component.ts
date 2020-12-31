import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { Illustration } from '../../../core/interfaces/illustration.interface';

@Component({
  selector: 'illustration-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  @Input() caption: string;
  @Input() entries: Illustration[];

  constructor() { }

  ngOnInit(): void {
    this.entries = [];
  }
}
