import { Component } from '@angular/core';
import {
  Car,
  Clock,
  Ellipsis,
  LucideAngularModule,
  Star,
  Tag,
} from 'lucide-angular';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'car-card',
  imports: [LucideAngularModule, BadgeComponent],
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
