import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {AuthService} from "@core/services/auth.service";
import {MatProgressBar} from "@angular/material/progress-bar";
/**
 * Component for user login.
 * Handles user authentication and form validation.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    MatProgressBar
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup; // Form group for the login form
  isLoading = false; // Indicates if a request is in progress
  submitted = false; // Indicates if the form has been submitted
  errorMsg: any; // Holds error messages

  /**
   * Constructor for the LoginComponent.
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
   * Initializes the component by creating the login form.
   */
  ngOnInit() {
    this.createForm(); // Set up the form on initialization
  }

  /**
   * Creates the login form with validation.
   */
  private createForm() {
    this.loginForm = this.formBuilder.group({
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
   * Handles form submission for login.
   * Validates the form and processes login if valid.
   */
  submitForm() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (data: any) => {
          if (data.result) {
            this.isLoading = false;
            this.router.navigate(['/dashboard']);
          } else {
            this.isLoading = false;
            this.errorMsg = data.message;
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
