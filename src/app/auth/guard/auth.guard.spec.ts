import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '@app/core/services/auth.service';

describe('AuthGuard', () => {
  let router: Router;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const credentialsSpy = jasmine.createSpyObj('CredentialsService', ['isAuthenticated']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: credentialsSpy }
      ]
    });

    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should have a canActivate method', () => {
    expect(typeof AuthGuard).toBe('function');
  });
  
  ///and more
});
