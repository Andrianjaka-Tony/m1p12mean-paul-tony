import { NgClass } from '@angular/common';
import { Component, input, signal, WritableSignal } from '@angular/core';
import { LucideAngularModule, Minus, Plus } from 'lucide-angular';

@Component({
  selector: 'quantity-buttons',
  imports: [NgClass, LucideAngularModule],
  templateUrl: './quantity-buttons.component.html',
  styles: ``,
})
export class QuantityButtonsComponent {
  readonly minus = Minus;
  readonly plus = Plus;

  readonly quantitySignal = input<WritableSignal<number>>(signal<number>(0));
}
