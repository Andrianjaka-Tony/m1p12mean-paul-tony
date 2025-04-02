import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteFromFind } from 'src/app/models/clients/quote.model';
import { QuoteService } from 'src/app/services/clients/quote.service';
import { QuoteDetailsComponent } from './quote-details/quote-details.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { Check, LucideAngularModule } from 'lucide-angular';
import { toast } from 'src/app/components/toast/toast.component';
import { catchError } from 'rxjs';

@Component({
  selector: 'quote-page',
  imports: [QuoteDetailsComponent, ButtonComponent, LucideAngularModule],
  templateUrl: './quote-page.component.html',
  styles: ``,
})
export class QuotePage implements OnInit {
  readonly check = Check;

  readonly quoteService = inject(QuoteService);
  readonly router = inject(Router);
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
      this.quote.set(response.data.devis);
      console.log(response.data.devis);
    });
  }

  accept() {
    this.quoteService
      .acceptQuote(this.quote())
      .pipe(
        catchError((error) => {
          toast(
            'error',
            'Confirmation échouée',
            "Le devis n'a pas pu être confirmé"
          );
          throw error;
        })
      )
      .subscribe(() => {
        toast(
          'success',
          'Confirmation réussie',
          'Le devis a bien été confirmé'
        );
        this.router.navigate(['/manager/overview']);
      });
  }
}
