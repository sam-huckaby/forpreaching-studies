import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lastTenIllustrations:any = [];

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    // Request the 10 most recent illustrations (for users without an account);
    this.http.get('/api/unsecured/topten').subscribe(result => {
      this.lastTenIllustrations = result;
      console.log(this.lastTenIllustrations);
    });
  }

}
