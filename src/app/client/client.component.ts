import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrivateNavigationComponent } from '../components/private-navigation/private-navigation.component';
import { PrivateNacigationLink } from '../components/private-navigation/private-navigation-item/private-navigation-item.component';

@Component({
  selector: 'app-manager',
  imports: [RouterOutlet, PrivateNavigationComponent],
  template: `
    <private-navigation role="Client" [links]="links" />
    <div class="px-5">
      <router-outlet />
    </div>
  `,
})
export class ClientRoute {
  readonly links: PrivateNacigationLink[] = [
    {
      href: '/client/overview',
      label: "Vue d'ensemble",
    },
    {
      href: '/client/dashboard',
      label: 'Dashboard',
    },
    {
      href: '/client/cars',
      label: 'Véhicules',
    },
    {
      href: '/client/profile',
      label: 'Profil',
    },
    {
      href: '/client/settings',
      label: 'Paramètres',
    },
  ];
}
