import { Component, inject, OnInit, signal } from '@angular/core';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { QuoteFromFind } from 'src/app/models/clients/quote.model';
import { QuoteService } from 'src/app/services/clients/quote.service';
import { QuoteListComponent } from './quote-list/quote-list.component';

@Component({
  selector: 'overview-page',
  imports: [PageTitleComponent, QuoteListComponent],
  templateUrl: './overview.component.html',
})
export class OverviewPage implements OnInit {
  readonly quoteService = inject(QuoteService);
  readonly waitingQuotes = signal<QuoteFromFind[]>([]);

  ngOnInit(): void {
    this.findQuotes();
  }

  findQuotes() {
    this.quoteService.findQuotesJustCreated().subscribe((response) => {
      this.waitingQuotes.set(response.data.devis);
    });
  }
}
