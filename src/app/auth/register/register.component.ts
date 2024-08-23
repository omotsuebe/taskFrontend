import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "@core/services/auth.service";
import {MatProgressBar} from "@angular/material/progress-bar";

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

  loginForm!: FormGroup;
  isLoading = false;
  submitted = false;
  errorMsg: any;
  successMsg: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hasError = (controlName: string, errorName: string) => {
    if (this.submitted) {
      return this.loginForm.controls[controlName].hasError(errorName);
    } else {
      return false;
    }
  };

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
