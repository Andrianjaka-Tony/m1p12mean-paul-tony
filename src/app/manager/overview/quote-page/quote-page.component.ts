import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuoteFromFind } from 'src/app/models/clients/quote.model';
import { QuoteService } from 'src/app/services/clients/quote.service';
import { QuoteDetailsComponent } from '../../../components/quote-details/quote-details.component';

@Component({
  selector: 'quote-page',
  imports: [QuoteDetailsComponent],
  templateUrl: './quote-page.component.html',
  styles: ``,
})
export class QuotePage implements OnInit {
  readonly quoteService = inject(QuoteService);
  readonly route = inject(ActivatedRoute);
  id: string = '';

  readonly quote = signal<QuoteFromFind>({} as QuoteFromFind);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id != null) {
        this.id = id;
        this.findQuote();
      }
    });
  }

  findQuote() {
    this.quoteService.findQuoteById(this.id).subscribe((response) => {
      console.log(response.data.devis);
      this.quote.set(response.data.devis);
    });
  }
}
