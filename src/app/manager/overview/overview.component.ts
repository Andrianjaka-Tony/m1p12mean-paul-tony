import { Component, inject, OnInit, signal } from '@angular/core';
import { QuoteFromFind } from 'src/app/models/clients/quote.model';
import { QuoteService } from 'src/app/services/clients/quote.service';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { NgClass } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'overview-page',
  imports: [QuoteListComponent, NgClass],
  templateUrl: './overview.component.html',
})
export class OverviewPage implements OnInit {
  readonly activeTab = signal<string>('waiting');
  readonly isLoading = signal<boolean>(true);

  readonly quoteService = inject(QuoteService);
  readonly waitingQuotes = signal<QuoteFromFind[]>([]);
  readonly acceptedQuotes = signal<QuoteFromFind[]>([]);
  readonly inProgressQuotes = signal<QuoteFromFind[]>([]);
  readonly completedQuotes = signal<QuoteFromFind[]>([]);

  ngOnInit(): void {
    this.loadAllQuotes();
  }

  loadAllQuotes() {
    forkJoin({
      waiting: this.quoteService.findQuotesJustCreated(),
      accepted: this.quoteService.findQuotesAccepted(),
      inProgress: this.quoteService.findQuotesInProgress(),
      completed: this.quoteService.findQuotesCompleted(),
    }).subscribe((responses) => {
      this.waitingQuotes.set(responses.waiting.data.devis);
      this.acceptedQuotes.set(responses.accepted.data.devis);
      this.inProgressQuotes.set(responses.inProgress.data.devis);
      this.completedQuotes.set(responses.completed.data.devis);
      this.isLoading.set(false);
    });
  }

  updateTab(value: string) {
    this.activeTab.set(value);
  }
}
