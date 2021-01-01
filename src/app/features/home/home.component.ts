import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
    this.http.get('/unsecured/topten/illustrations').subscribe(result => {
      this.lastTenIllustrations = result;
    });
  }

}
