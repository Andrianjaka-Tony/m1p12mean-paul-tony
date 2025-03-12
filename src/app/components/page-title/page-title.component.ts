import { Component, input } from '@angular/core';

@Component({
  selector: 'page-title',
  imports: [],
  templateUrl: './page-title.component.html',
  styles: ``,
})
export class PageTitleComponent {
  readonly title = input.required<string>();
}
