import { Component } from '@angular/core';
import { Car, Grid, List, LucideAngularModule, Search } from 'lucide-angular';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'overview-header',
  imports: [LucideAngularModule, ButtonComponent],
  templateUrl: './overview-header.component.html',
  styles: ``,
})
export class OverviewHeaderComponent {
  readonly search = Search;
  readonly grid = Grid;
  readonly list = List;
  readonly car = Car;
}
