import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Request the 10 most recent illustrations
    this.http.get('/api/unsecured/topten', {responseType: 'text'}).subscribe(result => console.debug(result));
  }

}
