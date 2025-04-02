import { Component, input } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';
import { QuoteFromFind } from 'src/app/models/clients/quote.model';

@Component({
  selector: 'quote-status',
  imports: [BadgeComponent],
  templateUrl: './quote-status.component.html',
  styles: ``,
})
export class QuoteStatusComponent {
  readonly quote = input.required<QuoteFromFind>();
}
