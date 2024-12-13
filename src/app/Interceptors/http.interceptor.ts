import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PopupService } from '../Services/popup.service';
import { notificationType } from '../app.component';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const popupService = inject(PopupService);

  console.log('Interceptor is running for request:', req);
  return next(req).pipe( 
    
    catchError((error: HttpErrorResponse) => {
        debugger
      if (error.status === 500) {
        popupService.show(notificationType.error,'خطای سرور', 'مشکلی در سرور رخ داده است. لطفاً بعداً تلاش کنید.');
      } else if (error.status === 404) {
        popupService.show(notificationType.error,'خطای 404', 'منبع موردنظر یافت نشد.');
      } else if (error.status === 401) {
        popupService.show(notificationType.error,'عدم احراز هویت', 'لطفاً وارد حساب کاربری خود شوید.');
      } else if (error.status === 400) {
        popupService.show(notificationType.error,'خطای اعتبار سنجی', 'لطفاً وارد حساب کاربری خود شوید.');
      }

      return throwError(error);
    })
  );
};
