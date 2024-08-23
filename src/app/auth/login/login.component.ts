import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {AuthService} from "@core/services/auth.service";
import {MatProgressBar} from "@angular/material/progress-bar";

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

  loginForm!: FormGroup;
  isLoading = false;
  submitted = false;
  errorMsg: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
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
