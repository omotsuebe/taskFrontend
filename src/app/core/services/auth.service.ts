import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ApiService } from '@app/core/services/api.service';
import { CredentialsService } from '@app/core/services/credentials.service';
import {HttpClient} from "@angular/common/http";

export interface LoginModel {
  email: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private credentialsService: CredentialsService,
    private apiService: ApiService,
    private http: HttpClient
    ) {}

  /**
   * Authenticates the user.
   * @param loginModel The login parameters.
   * @return The user credentials.
   */
  login(loginModel: LoginModel) {
    return this.apiService.post('/auth/login', loginModel).pipe(
      tap((data) => {
        if (data.result) {
          this.credentialsService.setCredentials(data, loginModel.remember);
        }
        return of(true);
      })
    );
  }

  register(user: any) {
    return this.apiService.post('/auth/register', user);
  }

  forgotPassword(user: any) {
    return this.apiService.post('/auth/forgot-password', user);
  }

  resendVerification(user: any) {
    return this.apiService.post('/auth/resend-verify', user);
  }

  processVerification(user: any) {
    return this.apiService.post('/auth/verify-user', user);
  }

  processPassword(username: string, password: string, code: string) {
    return this.apiService.post('/auth/reset-password', { username, password, code });
  }

  // profile
  profile() {
    return this.apiService.get('/auth/profile');
  }


  // update profile
  updateProfile(user: any) {
    return this.apiService.put('/auth/update-profile', user);
  }

  // update password
  updatePassword(user: any) {
    return this.apiService.put('/auth/update-password', user);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(data: string = ''): Observable<boolean> {
    this.credentialsService.setCredentials();
    this.apiService.post('/auth/logout', data);
    return of(true);
  }
}
