import { Component } from '@angular/core';
import { CarListComponent } from './car-list/car-list.component';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { OverviewHeaderComponent } from './overview-header/overview-header.component';

@Component({
  selector: 'overview-page',
  imports: [CarListComponent, QuoteListComponent, OverviewHeaderComponent],
  templateUrl: './overview.component.html',
  styles: ``,
})
export class OverviewPage {}
