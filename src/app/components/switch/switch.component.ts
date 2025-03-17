import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'switch',
  imports: [NgClass],
  templateUrl: './switch.component.html',
  styles: ``,
})
export class SwitchComponent {
  readonly checked = input<boolean>(true);
  readonly checkState = signal<boolean>(this.checked());
  readonly toggle = output<boolean>();

  handleToggle() {
    this.checkState.set(!this.checkState());
    this.toggle.emit(this.checkState());
  }
}
