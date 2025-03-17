import { NgClass } from '@angular/common';
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'avatar-image',
  imports: [],
  template: `
    <div class="absolute inset-0 rounded-full">
      @if (isImageLoaded()) {
      <img
        class="w-full h-full object-cover"
        [src]="image()"
        (error)="handleImageError()"
      />
      }
    </div>
  `,
})
export class AvatarImageComponent {
  readonly isImageLoaded = signal<boolean>(true);
  readonly image = input.required<string | undefined>();

  handleImageError() {
    this.isImageLoaded.set(false);
  }
}

@Component({
  selector: 'avatar-fallback',
  imports: [],
  template: `
    <div
      class="absolute inset-0 rounded-full flex items-center justify-center bg-[#222] text-white"
    >
      {{ character() }}
    </div>
  `,
})
export class AvatarFallbackComponent {
  readonly character = input.required<string | undefined>();
}

@Component({
  selector: 'avatar',
  imports: [AvatarImageComponent, AvatarFallbackComponent, NgClass],
  template: `
    <div
      [ngClass]="class()"
      class="relative rounded-full aspect-square overflow-hidden"
    >
      <avatar-fallback [character]="character()" />
      <avatar-image [image]="image()" />
    </div>
  `,
})
export class AvatarComponent {
  readonly class = input<string>();
  readonly image = input.required<string | undefined>();
  readonly character = input.required<string | undefined>();
}
