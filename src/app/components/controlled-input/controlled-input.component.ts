import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

type ErrorMessage = {
  validator: string;
  message: string;
};

@Component({
  selector: 'controlled-input',
  imports: [ReactiveFormsModule],
  templateUrl: './controlled-input.component.html',
  styles: ``,
})
export class ControlledInputComponent {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly type = input<string>('text');

  readonly controlName = input.required<string>();
  readonly isSubmitted = input<boolean>(false);
  readonly form = input.required<FormGroup>();
  readonly messages = input<ErrorMessage[]>([]);
}
