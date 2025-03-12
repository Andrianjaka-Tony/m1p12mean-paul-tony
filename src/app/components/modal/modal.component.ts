import { Component, output } from '@angular/core';

@Component({
  selector: 'modal',
  imports: [],
  templateUrl: './modal.component.html',
  styles: ``,
})
export class ModalComponent {
  readonly close = output();
}
