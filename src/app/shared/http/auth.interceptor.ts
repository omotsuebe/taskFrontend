import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '@core/services/credentials.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(CredentialsService);


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.credentials?.access_token;  // Get the token if using token-based auth

    // Clone the request and add the Sanctum-specific headers if needed.
    const authReq = authToken ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      },
      withCredentials: true  // Include credentials (cookies) with every request
    }) : req.clone({
      withCredentials: true  // Just include credentials without modifying headers
    });
    return next.handle(authReq);
  }
}
