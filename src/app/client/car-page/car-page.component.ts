import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Grid, List, LucideAngularModule, Search } from 'lucide-angular';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CarFromClient } from 'src/app/models/clients/car.model';
import { QuoteFromFind } from 'src/app/models/clients/quote.model';
import { QuoteService } from 'src/app/services/clients/quote.service';
import { QuoteDetailsComponent } from '../../components/quote-details/quote-details.component';
import { QuoteListComponent } from './quote-list/quote-list.component';

@Component({
  selector: 'car-page',
  imports: [
    LucideAngularModule,
    ButtonComponent,
    RouterLink,
    QuoteListComponent,
    QuoteDetailsComponent,
  ],
  templateUrl: './car-page.component.html',
  styles: ``,
})
export class CarPage implements OnInit {
  readonly search = Search;
  readonly grid = Grid;
  readonly list = List;

  readonly quoteService = inject(QuoteService);
  readonly route = inject(ActivatedRoute);
  id: string = '';

  readonly vehicle = signal<CarFromClient>({} as CarFromClient);
  readonly quotes = signal<QuoteFromFind[]>([]);
  readonly selectedQuoteId = signal<string>('');
  readonly selectedQuote = signal<QuoteFromFind>({} as QuoteFromFind);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id != null) {
        this.id = id;
        this.findAllQuotes();
        // this.findSelectedQuote();
      }
    });
  }

  findAllQuotes() {
    this.quoteService.findAllByVehicle(this.id).subscribe((response) => {
      this.quotes.set(response.data);
      if (response.data.length > 0) {
        this.selectedQuoteId.set(response.data[0]._id);
        this.findSelectedQuote();
      }
    });
  }

  findSelectedQuote() {
    this.quoteService
      .findQuoteById(this.selectedQuoteId())
      .subscribe((response) => {
        this.selectedQuote.set(response.data);
      });
  }

  refetchSelectedQuote(quoteId: string) {
    this.selectedQuoteId.set(quoteId);
    this.findSelectedQuote();
  }
}
