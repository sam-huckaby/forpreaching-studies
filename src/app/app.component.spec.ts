import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth0/auth0-angular';
import { AppComponent } from './app.component';

// Authentication Module
import { AuthModule } from '@auth0/auth0-angular';

describe('AppComponent', () => {
  let auth: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AuthModule.forRoot({
          domain: 'for-preaching.us.auth0.com',
          clientId: 'dx1sPXUS9Gu54L5ksXE6q5wKdwfUewLG'
        }),
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    auth = TestBed.inject(AuthService);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Illustrations For Preaching'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Illustrations For Preaching');
  });

  it('should render the sign in navigation item', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.main-navigation-child.main-navigation-link').textContent).toContain('Sign In ');
  });
});
