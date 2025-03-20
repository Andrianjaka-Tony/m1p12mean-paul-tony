import { Component } from '@angular/core';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'overview-header',
  imports: [LucideAngularModule],
  templateUrl: './overview-header.component.html',
  styles: ``,
})
export class OverviewHeaderComponent {
  readonly search = Search;
}
