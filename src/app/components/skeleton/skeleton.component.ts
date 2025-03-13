import { NgClass } from '@angular/common';
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'skeleton',
  imports: [NgClass],
  templateUrl: './skeleton.component.html',
  styles: ``,
})
export class SkeletonComponent {
  readonly class = input<string>('');

  readonly width = signal<number>(
    Math.floor(Math.random() * (60 - 35 + 1)) + 35
  );
}
