import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, distinctUntilChanged, Observable, of, tap, throwError } from 'rxjs';
import { ApiService } from '@app/core/services/api.service';
import { CredentialsService } from '@app/core/services/credentials.service';
import { User, LoginModel } from '../interfaces/User';

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  constructor(
    private credentialsService: CredentialsService,
    private apiService: ApiService,
  ) { }

  /**
   * Authenticates the user.
   * @param loginModel The login parameters.
   * @return The user credentials.
   */
  login(loginModel: LoginModel) {
    return this.apiService.post('/auth/login', loginModel).pipe(
      tap((data) => {
        if (data.result) {
          this.credentialsService.setCredentials(data, true);
          this.currentUserSubject.next(data);
          this.fetchCurrentUser().subscribe();
        }
        return of(true);
      })
    );
  }

  fetchCurrentUser(): Observable<User> {
    return this.apiService.get('/auth/profile').pipe(
      tap(user => this.currentUserSubject.next(user.data)),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  register(user: any) {
    return this.apiService.post('/auth/register', user);
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
  logout() {
    return this.apiService.post('/auth/logout', { logout: '' }).pipe(
      tap(() => {
        this.credentialsService.setCredentials();
        this.currentUserSubject.next(null);
      })
    );
  }
}
