import { Component } from '@angular/core';
import { CarListComponent } from './car-list/car-list.component';
import { QuoteListComponent } from './quote-list/quote-list.component';

@Component({
  selector: 'overview-page',
  imports: [CarListComponent, QuoteListComponent],
  templateUrl: './overview.component.html',
  styles: ``,
})
export class OverviewPage {}
