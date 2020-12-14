import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    
    return this.auth.isAuthenticated$.pipe(
        catchError(() => {
          // In the case of an error, just navigate to the home page
          this.router.navigate(['']);
          return of(false);
        }),
        map(loggedIn => {
          if (loggedIn) {
              return true;
          } else {
            this.router.navigate(['']);
            return false;
          }
        })
      );
  }
}
