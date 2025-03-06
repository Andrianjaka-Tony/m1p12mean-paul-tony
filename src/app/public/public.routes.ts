import { Routes } from '@angular/router';

export const publicRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomePage),
  },
  {
    path: 'subscriptions',
    loadComponent: () =>
      import('./subscription/subscription.component').then(
        (m) => m.SubscriptionPage
      ),
  },
  {
    path: 'faq',
    loadComponent: () => import('./faq/faq.component').then((m) => m.FAQPage),
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./sign-in/sign-in.component').then((m) => m.SigninPage),
  },
];
