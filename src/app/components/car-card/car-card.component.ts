import { Component } from '@angular/core';
import {
  Car,
  Clock,
  Ellipsis,
  LucideAngularModule,
  Star,
  Tag,
} from 'lucide-angular';

@Component({
  selector: 'car-card',
  imports: [LucideAngularModule],
  templateUrl: './car-card.component.html',
  styles: ``,
})
export class CarCardComponent {
  readonly car = Car;
  readonly tag = Tag;
  readonly hourglass = Clock;
  readonly ellipsis = Ellipsis;
  readonly star = Star;
}
