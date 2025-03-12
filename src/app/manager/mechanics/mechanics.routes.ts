import { Routes } from '@angular/router';

export const managerMechanicsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'skills',
    pathMatch: 'full',
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./skills/skills.component').then((m) => m.SkillsPage),
  },
];
