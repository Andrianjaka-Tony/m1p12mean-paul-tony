import { signal } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

type Input = {
  name: string;
  defaultValue: any;
  validators: ValidatorFn[];
};

export function createForm(inputs: Input[]) {
  const isSubmitted = signal<boolean>(false);
  const isSending = signal<boolean>(false);
  const message = signal<string>('');

  const formGroup = new FormGroup({});
  inputs.forEach((input) => {
    formGroup.addControl(
      input.name,
      new FormControl(input.defaultValue || '', input.validators || [])
    );
  });

  return { isSubmitted, isSending, message, formGroup };
}
