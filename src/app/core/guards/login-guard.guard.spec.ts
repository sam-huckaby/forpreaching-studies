import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginGuardGuard } from './login-guard.guard';
import { AuthService } from '@auth0/auth0-angular';

// Authentication Module
import { AuthModule } from '@auth0/auth0-angular';

describe('LoginGuardGuard', () => {
  let guard: LoginGuardGuard;
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AuthModule.forRoot({
          domain: 'for-preaching.us.auth0.com',
          clientId: 'dx1sPXUS9Gu54L5ksXE6q5wKdwfUewLG'
        }),
      ],
    });
    guard = TestBed.inject(LoginGuardGuard);
    auth = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
