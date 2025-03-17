import { Routes } from '@angular/router';

export const managerMechanicsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'employees',
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
    path: 'employees/profile/:id',
    loadComponent: () =>
      import('./employees/employee-profile/employee-profile.component').then(
        (m) => m.EmployeeProfilePage
      ),
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
