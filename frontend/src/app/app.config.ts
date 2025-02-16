import {APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {InitService} from './core/services/init.service';
import {lastValueFrom} from 'rxjs';
import {authInterceptor} from './core/interceptors/auth.interceptor';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {loadingInterceptor} from './core/interceptors/loading.interceptor';

function initializeApp(initService: InitService) {
  return () => lastValueFrom(initService.init());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [InitService]
    },
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};
