import { Component, signal } from '@angular/core';

@Component({
  selector: 'skeleton',
  imports: [],
  templateUrl: './skeleton.component.html',
  styles: ``,
})
export class SkeletonComponent {
  readonly width = signal<number>(
    Math.floor(Math.random() * (60 - 35 + 1)) + 35
  );
}
