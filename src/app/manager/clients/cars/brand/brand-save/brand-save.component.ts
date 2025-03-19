import { Component, inject, output } from '@angular/core';
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
import { BrandService } from 'src/app/services/clients/brand.service';
import { Brand } from 'src/app/models/clients/brand.model';

@Component({
  selector: 'brand-save',
  imports: [
    ModalComponent,
    ButtonComponent,
    LucideAngularModule,
    ReactiveFormsModule,
    NgClass,
    ControlledInputComponent,
  ],
  templateUrl: './brand-save.component.html',
  styles: ``,
})
export class BrandSaveComponent {
  readonly brandService = inject(BrandService);

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

      const brand = this.form.formGroup.value as Brand;
      this.brandService
        .save(brand)
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
            'Marque enregistrée',
            `La marque a bien été sauvegardée`
          );
          this.handleClose();
          this.afterSubmit.emit();
        });
    }
  }
}
