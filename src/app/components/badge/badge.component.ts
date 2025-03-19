import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

type BadgeColor =
  | 'blue'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'purple'
  | 'gray';

@Component({
  selector: 'badge',
  imports: [NgClass],
  templateUrl: './badge.component.html',
  styles: ``,
})
export class BadgeComponent {
  readonly backgrounds: { [key in BadgeColor]: string } = {
    blue: 'bg-blue-400',
    red: 'bg-red-400',
    orange: 'bg-orange-400',
    yellow: 'bg-yellow-400',
    green: 'bg-green-400',
    purple: 'bg-purple-400',
    gray: 'bg-gray-400',
  };

  readonly class = input<string>('');
  readonly color = input<BadgeColor>('blue');
  readonly text = input<string>('');
}
