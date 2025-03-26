import { NgClass } from '@angular/common';
import {
  Component,
  input,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { LucideAngularModule, Minus, Plus } from 'lucide-angular';
import { ServiceQuantity } from '../new-quote.component';

@Component({
  selector: 'quantity-buttons',
  imports: [NgClass, LucideAngularModule],
  templateUrl: './quantity-buttons.component.html',
  styles: ``,
})
export class QuantityButtonsComponent {
  readonly minus = Minus;
  readonly plus = Plus;

  readonly add = output<string>();
  readonly remove = output<string>();

  readonly service = input.required<string>();
  readonly quantity = input<number>(0);
}
