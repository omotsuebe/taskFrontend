import { Component, OnInit, inject } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "@core/services/auth.service";
import {MatProgressBar} from "@angular/material/progress-bar";

/**
 * Component for user registration.
 * Handles user registration form creation, validation, and submission.
 */
@Component({
    selector: 'app-register',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        MatProgressBar
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);


  registerForm!: FormGroup;
  isLoading = false;
  submitted = false;
  errorMsg: any;
  successMsg: any;

  /**
   * Initializes the component by creating the registration form.
   */
  ngOnInit() {
    this.createForm();
  }

  /**
   * Creates the registration form with validation.
   */
  private createForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Checks if a form control has an error.
   * @param controlName - The name of the form control.
   * @param errorName - The name of the error.
   * @returns boolean - True if the control has the specified error, false otherwise.
   */
  hasError = (controlName: string, errorName: string) => {
    if (this.submitted) {
      return this.registerForm.controls[controlName].hasError(errorName);
    } else {
      return false;
    }
  };

  /**
   * Handles form submission for registration.
   * Validates the form and processes registration if valid.
   */
  submitForm() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.isLoading = true;

      this.authService.register(this.registerForm.value).subscribe({
        next: data => {
          if (data.result) {
            this.isLoading = false;
            this.successMsg = 'Registration successful.';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000); // 2000ms = 1 seconds
          } else {
            this.isLoading = false;
            this.errorMsg = 'Registration failed. Please try again.';
          }
        },
        error: error => {
          this.isLoading = false;
          this.errorMsg = error;
        },
      });
    }
  }

}
