import { Component } from '@angular/core';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'arbc-connect';
  faSignInAlt = faSignInAlt;
  faBars = faBars;
  menuOpen: boolean = false;

  constructor(public auth: AuthService) {
    console.log(auth);
  }

  toggleDrawer() {
    this.menuOpen = !this.menuOpen;
  }
}
