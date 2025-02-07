import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
  });

  it('auth should be created', () => {
    expect(service).toBeTruthy();
  });

  it('auth should have a login method', () => {
    expect(service.login).toBeTruthy();
  });

  it('auth should have a register method', () => {
    expect(service.register).toBeTruthy();
  });

  it('auth should have a logout method', () => {
    expect(service.logout).toBeTruthy();
  });

  it('auth should have a fetchCurrentUser method', () => {
    expect(service.fetchCurrentUser).toBeTruthy();
  });

  it('auth should have an isAuthenticated property', () => {
    expect(service.isAuthenticated).toBeDefined();
  });
});
