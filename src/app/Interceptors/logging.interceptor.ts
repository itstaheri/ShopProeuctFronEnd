import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const loggingInterceptorFunctional: HttpInterceptorFn = (req, next) => {
    console.log('Request URL: ' + req.url);
    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Logging Interceptor Functional Error:', error);
        return throwError(()=> error);
      })
    );
  }