import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(error: any): Observable<HttpEvent<any>> {
    let errorMessage: any;
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = `${error.status} Bad Request.`;
          break;
        case 401:
          errorMessage = `${error.status} You are not authorized to perform this action.`;
          break;
        case 403:
          errorMessage = `${error.status} You do not have the permission to access the requested resource.`;
          break;
        case 404:
          errorMessage = `${error.status} The requested resource does not exist.`;
          break;
        case 412:
          errorMessage = `${error.status} Precondition failed.`;
          break;
        case 500:
          errorMessage = `${error.status} Internal server error.`;
          break;
        case 503:
          errorMessage = `${error.status} The request service is not available.`;
          break;
        case 422:
          errorMessage = this.backEndValidations(error);
          break;
        default:
          errorMessage = 'Something went wrong';
      }
    }
    return throwError(() => {
      return errorMessage;
    });
  }

  //Handling backend errors
  backEndValidations(error: HttpErrorResponse) {
    return error.error.message;
  }
}
