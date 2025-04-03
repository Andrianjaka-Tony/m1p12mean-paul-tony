import { Component, input, OnInit } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';
import { QuoteFromFind } from 'src/app/models/clients/quote.model';

@Component({
  selector: 'quote-status',
  imports: [BadgeComponent],
  templateUrl: './quote-status.component.html',
  styles: ``,
})
export class QuoteStatusComponent implements OnInit {
  readonly quote = input.required<QuoteFromFind>();

  ngOnInit(): void {
    console.log(this.quote());
  }
}
