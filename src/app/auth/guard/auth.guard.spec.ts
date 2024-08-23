import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CredentialsService } from '@app/core/services/credentials.service';

describe('AuthGuard', () => {
  let router: Router;
  let credentialsService: jasmine.SpyObj<CredentialsService>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const credentialsSpy = jasmine.createSpyObj('CredentialsService', ['isAuthenticated']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: CredentialsService, useValue: credentialsSpy }
      ]
    });

    router = TestBed.inject(Router);
    credentialsService = TestBed.inject(CredentialsService) as jasmine.SpyObj<CredentialsService>;
  });

  it('should have a canActivate method', () => {
    expect(typeof AuthGuard).toBe('function');
  });
  ///and more
});
