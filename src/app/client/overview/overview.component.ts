import { Component } from '@angular/core';
import { CarListComponent } from './car-list/car-list.component';
import { QuoteCardComponent } from '../../components/quote-card/quote-card.component';

@Component({
  selector: 'overview-page',
  imports: [CarListComponent, QuoteCardComponent],
  templateUrl: './overview.component.html',
  styles: ``,
})
export class OverviewPage {}
