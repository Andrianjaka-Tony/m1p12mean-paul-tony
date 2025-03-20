import { Component, input } from '@angular/core';
import {
  Car,
  Clock,
  Ellipsis,
  LucideAngularModule,
  Star,
  Tag,
} from 'lucide-angular';
import { BadgeComponent } from '../badge/badge.component';
import { CarFromClient } from 'src/app/models/clients/car.model';

@Component({
  selector: 'car-card',
  imports: [LucideAngularModule, BadgeComponent],
  templateUrl: './car-card.component.html',
  styles: ``,
})
export class CarCardComponent {
  readonly carIcon = Car;
  readonly tag = Tag;
  readonly hourglass = Clock;
  readonly ellipsis = Ellipsis;
  readonly star = Star;

  readonly car = input.required<CarFromClient>();
}
