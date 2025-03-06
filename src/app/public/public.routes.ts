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
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginPage),
  },
];
