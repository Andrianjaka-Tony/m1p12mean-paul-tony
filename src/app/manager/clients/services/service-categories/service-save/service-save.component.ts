import { Component, inject, OnInit, output, signal } from '@angular/core';
import { Award, LucideAngularModule, X } from 'lucide-angular';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { catchError, finalize } from 'rxjs';
import { createForm } from 'src/app/utils/create-form';
import {
  ControlledInputComponent,
  SelectOption,
} from 'src/app/components/controlled-input/controlled-input.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { toast } from 'src/app/components/toast/toast.component';
import { Response } from 'src/app/models/response.model';
import {
  ServiceFromForm,
  ServicesService,
} from 'src/app/services/mechanic/services.service';
import { ServiceCategory } from 'src/app/models/mechanic/services.model';

@Component({
  selector: 'service-category-save',
  imports: [
    ModalComponent,
    ButtonComponent,
    LucideAngularModule,
    ReactiveFormsModule,
    NgClass,
    ControlledInputComponent,
  ],
  templateUrl: './service-save.component.html',
  styles: ``,
})
export class ServiceCategorySaveComponent implements OnInit {
  readonly servicesService = inject(ServicesService);

  readonly cross = X;
  readonly award = Award;

  readonly serviceCategories = signal<SelectOption[]>([]);

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

  ngOnInit(): void {
    this.servicesService.findAllCategories().subscribe((response) => {
      this.serviceCategories.set(response.data.categories as SelectOption[]);
    });
  }

  handleClose() {
    this.close.emit();
  }

  handleSubmit() {
    this.form.isSubmitted.set(true);
    if (this.form.formGroup.valid) {
      this.form.isSending.set(true);

      const category = this.form.formGroup.value as ServiceCategory;
      this.servicesService
        .saveServiceCategory(category)
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
            'Catégorie de service enregistrée',
            `La catégorie de service a bien été sauvegardée`
          );
          this.handleClose();
          this.afterSubmit.emit();
        });
    }
  }
}
