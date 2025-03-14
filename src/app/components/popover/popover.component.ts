import {
  Component,
  contentChild,
  ElementRef,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PopoverService } from './popover.service';
import { NgClass, NgStyle } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'popover',
  imports: [],
  template: `
    <div
      [id]="id()"
      tabindex="0"
      (focus)="openPopover()"
      (blur)="closePopover()"
      class="relative"
    >
      <ng-content></ng-content>
    </div>
  `,
  providers: [PopoverService],
})
export class PopoverComponent implements OnInit, OnDestroy {
  readonly trigger = contentChild(PopoverTriggerComponent);
  readonly id = input<string>('');
  private scrollHandler: (() => void) | null = null;

  constructor(private popoverService: PopoverService) {}

  ngOnInit(): void {
    this.popoverService.setId(this.id());
  }

  ngOnDestroy(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  openPopover() {
    if (this.trigger()) {
      this.trigger()?.updatePosition();

      this.scrollHandler = () => {
        this.trigger()?.updatePosition();
      };

      window.addEventListener('scroll', this.scrollHandler);
    }
    this.popoverService.toggle();
  }

  closePopover() {
    this.popoverService.toggle();

    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
      this.scrollHandler = null;
    }
  }
}

@Component({
  selector: 'popover-trigger',
  imports: [NgClass],
  template: `
    <div [ngClass]="[class()]" class="cursor-pointer">
      <ng-content></ng-content>
    </div>
  `,
})
export class PopoverTriggerComponent {
  isOpen = false;
  readonly class = input<string>('');

  constructor(
    private popoverService: PopoverService,
    private elementRef: ElementRef
  ) {
    this.popoverService.isOpen$.subscribe((state) => {
      this.isOpen = state;
    });
  }

  updatePosition() {
    const rect: DOMRect = this.elementRef.nativeElement.getBoundingClientRect();
    this.popoverService.setRectangle(rect);
    console.log(rect);
  }
}

@Component({
  selector: 'popover-content',
  imports: [NgStyle, NgClass],
  template: `
    @if (isOpen) {
    <div
      class="fixed z-100 translate-y-1 max-w-96 bg-[#111] border border-[#333] rounded-lg shadow-md"
      [ngStyle]="style"
      [ngClass]="[class()]"
    >
      <ng-content></ng-content>
    </div>
    }
  `,
})
export class PopoverContentComponent {
  isOpen = false;
  class = input<string>('');
  origin = input<'left' | 'right'>('left');
  style: any = {};

  constructor(private popoverService: PopoverService) {
    this.popoverService.isOpen$.subscribe((state) => {
      this.isOpen = state;
    });
    this.popoverService.rectangle$.subscribe((rect) => {
      if (this.origin() === 'left') {
        this.style = { left: `${rect.left}px` };
      } else {
        this.style = {
          right: `${window.innerWidth - rect.left - rect.width}px`,
        };
      }
      this.style.top = rect.top + rect.height + 'px';
    });
  }
}

@Component({
  selector: '[popoverItemsContainer]',
  imports: [],
  template: `
    <div class="w-full p-2 flex flex-col">
      <ng-content />
    </div>
  `,
})
export class PopoverItemsContainerComponent {}

@Component({
  selector: '[popoverItem]',
  imports: [LucideAngularModule],
  template: `
    <lucide-angular [img]="icon()" class="h-4 w-4" />
    <p class="">{{ label() }}</p>
  `,
  host: {
    class:
      'p-1.5 rounded flex gap-1.5 items-center cursor-pointer duration-200 hover:bg-[#222]',
  },
})
export class PopoverItemComponent {
  label = input<string>('');
  icon = input<any>();
}

@Component({
  selector: 'popover-close',
  imports: [],
  template: `
    <div (click)="blurPopover($event)">
      <ng-content></ng-content>
    </div>
  `,
})
export class PopoverCloseComponent {
  popoverId = '';

  constructor(private popoverService: PopoverService) {
    this.popoverService.popoverId$.subscribe((state) => {
      this.popoverId = state;
    });
  }

  blurPopover(event: Event) {
    event.preventDefault();
    if (this.popoverId) {
      document.getElementById(this.popoverId)?.blur();
    }
  }
}
