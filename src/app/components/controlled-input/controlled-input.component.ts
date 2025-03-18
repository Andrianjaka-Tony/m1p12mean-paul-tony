import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChevronDown, LucideAngularModule } from 'lucide-angular';

type ErrorMessage = {
  validator: string;
  message: string;
};

type SelectDataType = {
  _id: string;
  label: string;
};

@Component({
  selector: 'controlled-input',
  imports: [ReactiveFormsModule, NgClass, LucideAngularModule],
  templateUrl: './controlled-input.component.html',
  styles: ``,
})
export class ControlledInputComponent {
  readonly chevronDown = ChevronDown;

  readonly id = input.required<string>();
  readonly class = input<string>();
  readonly label = input.required<string>();
  readonly type = input<string>('text');

  readonly controlName = input.required<string>();
  readonly isSubmitted = input<boolean>(false);
  readonly form = input.required<FormGroup>();
  readonly messages = input<ErrorMessage[]>([]);

  readonly options = input<SelectDataType[]>([]);
}
