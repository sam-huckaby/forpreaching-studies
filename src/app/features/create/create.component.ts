import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  // Form element model
  illustrationForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    body: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  onSubmit(): void {
    // Submit things
    // this.http.post('/api/illustrations', this.illustrationForm.value, {responseType: 'text'}).subscribe(result => console.debug(result));
    this.http.get('/api/illustrations', {responseType: 'text'}).subscribe(result => console.debug(result));

    console.log(this.illustrationForm.value);
    // console.log(this.illustrationText.value);
  }
}
