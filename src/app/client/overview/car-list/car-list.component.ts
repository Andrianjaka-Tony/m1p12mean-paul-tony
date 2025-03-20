import { Component, input, WritableSignal } from '@angular/core';
import { CarCardComponent } from '../../../components/car-card/car-card.component';
import { CarFromClient } from 'src/app/models/clients/car.model';

@Component({
  selector: 'car-list',
  imports: [CarCardComponent],
  templateUrl: './car-list.component.html',
  styles: ``,
})
export class CarListComponent {
  readonly cars = input.required<WritableSignal<CarFromClient[]>>();
}
