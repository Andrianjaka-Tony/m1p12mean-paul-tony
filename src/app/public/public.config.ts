import { provideRouter, withViewTransitions } from '@angular/router';
import { publicRoutes } from './public.routes';

export const providePublicRouter = () =>
  provideRouter(
    publicRoutes,
    withViewTransitions({ skipInitialTransition: true })
  );
