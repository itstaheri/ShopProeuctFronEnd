import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { loaderInterceptor } from './Interceptors/loader.interceptor';
import { httpInterceptor } from './Interceptors/http.interceptor';
import { loggingInterceptorFunctional } from './Interceptors/logging.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([loggingInterceptorFunctional,loaderInterceptor, httpInterceptor]) 
    ),
    provideRouter(routes),
    provideClientHydration()
  ]
};