import { Component, signal } from '@angular/core';
import { Grid, List, LucideAngularModule, Search } from 'lucide-angular';
import { ButtonComponent } from '../../../components/button/button.component';
import { CarSaveComponent } from './car-save/car-save.component';

@Component({
  selector: 'overview-header',
  imports: [LucideAngularModule, ButtonComponent, CarSaveComponent],
  templateUrl: './overview-header.component.html',
  styles: ``,
})
export class OverviewHeaderComponent {
  readonly search = Search;
  readonly grid = Grid;
  readonly list = List;

  readonly isSave = signal<boolean>(false);

  toggleSave() {
    this.isSave.set(!this.isSave());
  }
}
