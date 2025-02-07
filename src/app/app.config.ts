import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import {HttpInterceptorProviders} from "@shared/http";
import { CredentialsService } from './core/services/credentials.service';
import { AuthService } from './core/services/auth.service';
import { EMPTY } from 'rxjs';

export function initAuth(credentialService: CredentialsService, authService: AuthService) {
  return () => (credentialService.credentials ? authService.fetchCurrentUser() : EMPTY);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(),withInterceptorsFromDi()),
    HttpInterceptorProviders,
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [CredentialsService, AuthService],
      multi: true,
    }
  ],
};
