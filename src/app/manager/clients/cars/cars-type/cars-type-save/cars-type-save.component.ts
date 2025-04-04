import { Component, inject, OnInit, output, signal } from '@angular/core';
import { Award, LucideAngularModule, X } from 'lucide-angular';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { catchError, finalize } from 'rxjs';
import { createForm } from 'src/app/utils/create-form';
import { ControlledInputComponent } from 'src/app/components/controlled-input/controlled-input.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { toast } from 'src/app/components/toast/toast.component';
import { Response } from 'src/app/models/response.model';
import { CarTypeService } from 'src/app/services/clients/car-type.service';
import { CarType } from 'src/app/models/clients/car-type.model';

@Component({
  selector: 'cars-type-save',
  imports: [
    ModalComponent,
    ButtonComponent,
    LucideAngularModule,
    ReactiveFormsModule,
    NgClass,
    ControlledInputComponent,
  ],
  templateUrl: './cars-type-save.component.html',
  styles: ``,
})
export class CarsTypeSaveComponent {
  readonly carTypeService = inject(CarTypeService);

  readonly cross = X;
  readonly award = Award;

  readonly close = output();
  readonly afterSubmit = output();

  readonly fields = [
    { name: 'label', defaultValue: '', validators: [Validators.required] },
  ];
  readonly form = createForm(this.fields);
  readonly fieldsControls = [
    {
      id: 'label',
      label: 'Intitulé',
      type: 'text',
      controleName: 'label',
      isSubmitted: this.form.isSubmitted,
      form: this.form.formGroup,
      messages: [{ message: "L'intitulé est requis.", validator: 'required' }],
    },
  ];
  readonly names = this.fieldsControls.filter(
    (element) => element.id === 'label'
  );

  handleClose() {
    this.close.emit();
  }

  handleSubmit() {
    this.form.isSubmitted.set(true);
    if (this.form.formGroup.valid) {
      this.form.isSending.set(true);

      const carType = this.form.formGroup.value as CarType;
      this.carTypeService
        .save(carType)
        .pipe(
          catchError((e) => {
            const error = e.error as Response<undefined>;
            this.form.message.set(error.message);
            throw e;
          }),
          finalize(() => {
            this.form.isSending.set(false);
          })
        )
        .subscribe(() => {
          toast(
            'success',
            'Type de véhicule enregistré',
            `La type de véhicule a bien été sauvegardé`
          );
          this.handleClose();
          this.afterSubmit.emit();
        });
    }
  }
}
