import { Component } from '@angular/core';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { PageStructureComponent } from '../../components/page-structure/page-structure.component';
import { PageSidebarSection } from '../../components/page-structure/page-sidebar-section/page-sidebar-section.component';
import { Car, LayoutDashboard, User, Wrench } from 'lucide-angular';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'client-page',
  imports: [RouterOutlet, PageTitleComponent, PageStructureComponent],
  templateUrl: './clients.component.html',
  styles: ``,
})
export class ClientsPage {
  readonly sections: PageSidebarSection[] = [
    {
      title: "Vue d'ensemble",
      items: [
        {
          href: '/manager/clients/dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'Clients',
      items: [
        {
          href: '/manager/clients/customers',
          label: 'Clients',
          icon: User,
        },
        {
          href: '/manager/clients/services',
          label: 'Services',
          icon: Wrench,
        },
      ],
    },
    {
      title: 'Véhicules',
      items: [
        {
          href: '/manager/clients/cars',
          label: 'Types & Marques',
          icon: Car,
        },
      ],
    },
  ];
}
