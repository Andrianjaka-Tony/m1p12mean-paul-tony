import { Component, input } from '@angular/core';

import { PageSidebarComponent } from './page-sidebar/page-sidebar.component';
import { PageSidebarSection } from './page-sidebar-section/page-sidebar-section.component';

@Component({
  selector: 'page-structure',
  imports: [PageSidebarComponent],
  templateUrl: './page-structure.component.html',
  styles: ``,
})
export class PageStructureComponent {
  readonly sections = input.required<PageSidebarSection[]>();
}
