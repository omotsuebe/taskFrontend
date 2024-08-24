import {Component, OnInit} from '@angular/core';
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
  standalone: true,
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

  loginForm!: FormGroup; // Form group for the registration form
  isLoading = false; // Indicates if a request is in progress
  submitted = false; // Indicates if the form has been submitted
  errorMsg: any; // Holds error messages
  successMsg: any; // Holds success messages

  /**
   * Constructor for the RegisterComponent.
   * @param router - Router service for navigation.
   * @param formBuilder - FormBuilder service for creating forms.
   * @param authService - AuthService for handling authentication.
   */
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

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
    this.loginForm = this.formBuilder.group({
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
      return this.loginForm.controls[controlName].hasError(errorName);
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
    if (this.loginForm.invalid) {
      return;
    } else {
      console.log(this.loginForm.value);
      this.isLoading = true;

      this.authService.register(this.loginForm.value).subscribe({
        next: (data: any) => {
          if (data.result) {
            this.isLoading = false;
            this.successMsg = 'Registration successful.';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000); // 3000ms = 3 seconds
          } else {
            this.isLoading = false;
            this.errorMsg = 'Registration failed. Please try again.';
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMsg = error;
        },
      });
    }
  }

}
