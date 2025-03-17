import { Routes } from '@angular/router';

export const managerMechanicsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'skills',
    pathMatch: 'full',
  },
  {
    path: 'employees',
    redirectTo: 'employees/1',
    pathMatch: 'full',
  },
  {
    path: 'employees/:page',
    loadComponent: () =>
      import('./employees/employees.component').then((m) => m.EmployeesPage),
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
