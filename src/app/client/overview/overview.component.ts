import { Component } from '@angular/core';
import { CarListComponent } from './car-list/car-list.component';

@Component({
  selector: 'overview-page',
  imports: [CarListComponent],
  templateUrl: './overview.component.html',
  styles: ``,
})
export class OverviewPage {}
