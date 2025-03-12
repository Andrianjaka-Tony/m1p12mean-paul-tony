import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

export type PageSidebarItem = {
  href: string;
  label: string;
  icon: any;
};

@Component({
  selector: 'page-sidebar-item',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './page-sidebar-item.component.html',
  styleUrl: `./page-sidebar-item.component.css`,
})
export class PageSidebarItemComponent {
  readonly item = input.required<PageSidebarItem>();
}
