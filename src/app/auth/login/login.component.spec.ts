import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Login should create', () => {
    expect(component).toBeTruthy();
  });

  it('Login should have a form', () => {
    expect(component.loginForm).toBeTruthy();
  });

  it('Login should have an email field', () => {
    expect(component.loginForm.controls['email']).toBeTruthy();
  });

  it('Login should have a password field', () => {
    expect(component.loginForm.controls['password']).toBeTruthy();
  });

  it('Login should have a submit button', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
  });

});
