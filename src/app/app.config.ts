import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Correct import
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    NoopAnimationsModule,
    provideHttpClient(withInterceptorsFromDi())
  ]
};
