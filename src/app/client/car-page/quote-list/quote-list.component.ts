import { Component, input } from '@angular/core';
import { QuoteFromFind } from 'src/app/models/clients/quote.model';
import { QuoteCardComponent } from '../quote-card/quote-card.component';

@Component({
  selector: 'quote-list',
  imports: [QuoteCardComponent],
  templateUrl: './quote-list.component.html',
  styles: ``,
})
export class QuoteListComponent {
  readonly quotes = input.required<QuoteFromFind[]>();
}
