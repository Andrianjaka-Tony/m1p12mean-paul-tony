import { Component, input } from '@angular/core';
import { QuoteFromFind } from 'src/app/models/clients/quote.model';
import { FormatDatePipe } from 'src/app/pipes/date-format.pipe';
import { NumberFormatPipe } from 'src/app/pipes/number-format.pipe';
import { QuoteStatusComponent } from '../../../components/quote-status/quote-status.component';

@Component({
  selector: 'quote-card',
  imports: [FormatDatePipe, NumberFormatPipe, QuoteStatusComponent],
  templateUrl: './quote-card.component.html',
  styles: `
    .quote-card-svg {
      stroke-width: 4px;
      stroke-dasharray: calc(2 * 3.14 * 22);
      stroke-dashoffset: calc(2 * 3.14 * 22 * (1 - 0.84));
      transform: rotate(-90deg);
    }
  `,
})
export class QuoteCardComponent {
  readonly quote = input.required<QuoteFromFind>();
}
