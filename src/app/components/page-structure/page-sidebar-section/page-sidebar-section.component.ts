import { Component, input } from '@angular/core';
import {
  PageSidebarItem,
  PageSidebarItemComponent,
} from '../page-sidebar-item/page-sidebar-item.component';

export type PageSidebarSection = {
  title: string;
  items: PageSidebarItem[];
};

@Component({
  selector: 'page-sidebar-section',
  imports: [PageSidebarItemComponent],
  templateUrl: './page-sidebar-section.component.html',
  styles: ``,
})
export class PageSidebarSectionComponent {
  readonly section = input.required<PageSidebarSection>();
}
