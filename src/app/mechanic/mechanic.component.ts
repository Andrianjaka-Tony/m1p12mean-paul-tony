import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrivateNavigationComponent } from '../components/private-navigation/private-navigation.component';
import { PrivateNacigationLink } from '../components/private-navigation/private-navigation-item/private-navigation-item.component';

@Component({
  selector: 'app-manager',
  imports: [RouterOutlet, PrivateNavigationComponent],
  template: `
    <private-navigation role="Mécanicien" [links]="links" />
    <div class="px-5">
      <router-outlet />
    </div>
  `,
})
export class MechanicRoute {
  readonly links: PrivateNacigationLink[] = [
    {
      href: '/mechanic/overview',
      label: "Vue d'ensemble",
    },
    {
      href: '/mechanic/tasks',
      label: 'Toutes les tâches',
    },
  ];
}
