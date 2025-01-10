import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { CakeState } from './states/cake.state';
import { ApiHttpInterceptor } from '../services/http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(NgxsModule.forRoot([CakeState])),
    provideHttpClient(withInterceptorsFromDi()),
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiHttpInterceptor,
        multi: true
      },
  ],
};
