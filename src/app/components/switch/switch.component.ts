import { NgClass } from '@angular/common';
import { Component, input, OnInit, output, signal } from '@angular/core';

@Component({
  selector: 'switch',
  imports: [NgClass],
  templateUrl: './switch.component.html',
  styles: ``,
})
export class SwitchComponent implements OnInit {
  readonly checked = input<boolean>(false);
  readonly checkState = signal<boolean>(this.checked());
  readonly toggle = output<boolean>();

  ngOnInit(): void {
    this.checkState.set(this.checked());
  }

  handleToggle() {
    this.checkState.set(!this.checkState());
    this.toggle.emit(this.checkState());
  }
}
