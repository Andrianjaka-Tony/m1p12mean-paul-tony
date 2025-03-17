import { Routes } from '@angular/router';

export const managerMechanicsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'skills',
    pathMatch: 'full',
  },
  {
    path: 'skills',
    redirectTo: 'skills/1',
    pathMatch: 'full',
  },
  {
    path: 'skills/:page',
    loadComponent: () =>
      import('./skills/skills.component').then((m) => m.SkillsPage),
  },
];
