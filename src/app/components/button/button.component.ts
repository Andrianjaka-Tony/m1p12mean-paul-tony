import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, output, Output } from '@angular/core';

@Component({
  selector: 'button-component',
  imports: [NgClass],
  template: `
    <button [ngClass]="buttonClasses" [disabled]="disabled" [type]="type">
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link' = 'default';
  @Input() size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
  @Input() disabled = false;
  @Input() class = '';
  @Input() type = 'button';

  click = output();

  get buttonClasses(): string {
    return [
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer',
      this.disabled ? 'opacity-50 pointer-events-none' : '',
      this.getVariantClass(),
      this.getSizeClass(),
      this.class,
    ].join(' ');
  }

  private getVariantClass(): string {
    switch (this.variant) {
      case 'default':
        return 'bg-[#eee] hover:bg-[#ddd] text-black';
      case 'destructive':
        return 'bg-destructive text-destructive-foreground hover:bg-destructive/90';
      case 'outline':
        return 'border border-input bg-background hover:bg-accent hover:text-accent-foreground';
      case 'secondary':
        return 'bg-[#111] hover:bg-[#222] border border-[#444]';
      case 'ghost':
        return 'hover:bg-accent hover:text-accent-foreground';
      case 'link':
        return 'text-primary underline-offset-4 hover:underline';
      default:
        return '';
    }
  }

  private getSizeClass(): string {
    switch (this.size) {
      case 'default':
        return 'h-10 px-4 py-2';
      case 'sm':
        return 'h-9 rounded-md px-3';
      case 'lg':
        return 'h-11 rounded-md px-8';
      case 'icon':
        return 'h-8 w-8';
      default:
        return '';
    }
  }
}
