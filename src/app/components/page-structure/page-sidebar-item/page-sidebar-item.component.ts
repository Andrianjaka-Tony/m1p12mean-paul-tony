import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

export type PageSidebarItem = {
  href: string;
  label: string;
  icon: any;
};

@Component({
  selector: 'page-sidebar-item',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './page-sidebar-item.component.html',
  styles: ``,
})
export class PageSidebarItemComponent {
  readonly item = input.required<PageSidebarItem>();
}
