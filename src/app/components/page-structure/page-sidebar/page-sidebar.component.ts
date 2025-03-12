import { Component, input } from '@angular/core';
import {
  PageSidebarSection,
  PageSidebarSectionComponent,
} from '../page-sidebar-section/page-sidebar-section.component';

@Component({
  selector: 'page-sidebar',
  imports: [PageSidebarSectionComponent],
  templateUrl: './page-sidebar.component.html',
  styles: ``,
})
export class PageSidebarComponent {
  readonly sections = input.required<PageSidebarSection[]>();
}
