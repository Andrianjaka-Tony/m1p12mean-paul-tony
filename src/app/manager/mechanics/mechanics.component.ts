import { Component } from '@angular/core';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { PageStructureComponent } from '../../components/page-structure/page-structure.component';
import { PageSidebarSection } from '../../components/page-structure/page-sidebar-section/page-sidebar-section.component';
import {
  Award,
  ChartSpline,
  DollarSign,
  LayoutDashboard,
  Wrench,
} from 'lucide-angular';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'mechanics-page',
  imports: [RouterOutlet, PageTitleComponent, PageStructureComponent],
  templateUrl: './mechanics.component.html',
  styles: ``,
})
export class MechanicsPage {
  readonly sections: PageSidebarSection[] = [
    {
      title: "Vue d'ensemble",
      items: [
        {
          href: '/manager/mechanics/dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard,
        },
        {
          href: '/manager/mechanics/performances',
          label: 'Performances',
          icon: ChartSpline,
        },
      ],
    },
    {
      title: 'Mécaniciens',
      items: [
        {
          href: '/manager/mechanics/staff',
          label: 'Mécaniciens',
          icon: Wrench,
        },
        {
          href: '/manager/mechanics/skills',
          label: 'Compétences',
          icon: Award,
        },
      ],
    },
    {
      title: 'Salaires',
      items: [
        {
          href: '/manager/mechanics/salaries',
          label: 'Salaires',
          icon: DollarSign,
        },
      ],
    },
  ];
}
