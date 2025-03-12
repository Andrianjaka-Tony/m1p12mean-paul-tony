import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrivateNavigationComponent } from '../components/private-navigation/private-navigation.component';
import { PrivateNacigationLink } from '../components/private-navigation/private-navigation-item/private-navigation-item.component';

@Component({
  selector: 'app-manager',
  imports: [RouterOutlet, PrivateNavigationComponent],
  template: `
    <private-navigation role="Manager" [links]="links" />
    <div class="px-5">
      <router-outlet />
    </div>
  `,
})
export class ManagerRoute {
  readonly links: PrivateNacigationLink[] = [
    {
      href: '/manager/overview',
      label: "Vue d'ensemble",
    },
    {
      href: '/manager/dashboard',
      label: 'Dashboard',
    },
    {
      href: '/manager/clients',
      label: 'Clients',
    },
    {
      href: '/manager/mechanics',
      label: 'Mécaniciens',
    },
    {
      href: '/manager/profile',
      label: 'Profil',
    },
    {
      href: '/manager/settings',
      label: 'Paramètres',
    },
  ];
}
