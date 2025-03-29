import { Component, input } from '@angular/core';
import { QuoteCardComponent } from '../../../components/quote-card/quote-card.component';
import { QuoteFromFind } from 'src/app/models/clients/quote.model';

@Component({
  selector: 'quote-list',
  imports: [QuoteCardComponent],
  templateUrl: './quote-list.component.html',
  styles: ``,
})
export class QuoteListComponent {
  readonly quotes = input.required<QuoteFromFind[]>();
}
