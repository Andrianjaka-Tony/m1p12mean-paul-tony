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
import { SkeletonComponent } from '../skeleton/skeleton.component';

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

@Component({
  selector: 'car-skeleton',
  imports: [LucideAngularModule, SkeletonComponent],
  template: `
    <div
      class="relative p-4 text-sm bg-[#111] border border-[#333] rounded-lg cursor-pointer duration-200"
    >
      <div class="w-full flex items-center gap-4">
        <skeleton class="h-12 !w-12 rounded-full" />
        <div class="w-full flex flex-col mt-1 gap-2.5">
          <skeleton class="!h-4 !w-36" />
          <skeleton class="!h-2 !w-24" />
        </div>
      </div>
      <div class="w-full mt-4 flex gap-2 py-1.5">
        <skeleton class="!h-4 !w-30" />
        <skeleton class="!h-4 !w-24" />
      </div>
      <div class="mt-6 flex flex-col">
        <div class="py-1">
          <skeleton class="!h-3 !w-36" />
        </div>
        <div class="py-1">
          <skeleton class="!h-3 !w-24" />
        </div>
      </div>
    </div>
  `,
})
export class CarSkeletonComponent {}
