import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Register should create', () => {
    expect(component).toBeTruthy();
  });

  it('Register should have a form', () => {
    expect(component.registerForm).toBeTruthy();
  });

  it('Register should have a name field', () => {
    expect(component.registerForm.controls['name']).toBeTruthy();
  });

  it('Register should have an email field', () => {
    expect(component.registerForm.controls['email']).toBeTruthy();
  });

  it('Register should have a password field', () => {
    expect(component.registerForm.controls['password']).toBeTruthy();
  });

  it('Register should have a submit button', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
  });
});
