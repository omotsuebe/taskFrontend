import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefixInterceptor } from './api-prefix.interceptor';
import { AuthInterceptor } from './auth.interceptor';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';

/** Http interceptor providers in outside-in order */
export const HttpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiPrefixInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true,
  },
];
