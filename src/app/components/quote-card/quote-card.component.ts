import { Component } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'quote-card',
  imports: [BadgeComponent],
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
export class QuoteCardComponent {}
