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

@Component({
  selector: 'service-save',
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
export class ServiceSaveComponent implements OnInit {
  readonly servicesService = inject(ServicesService);

  readonly cross = X;
  readonly award = Award;

  readonly serviceCategories = signal<SelectOption[]>([]);

  readonly close = output();
  readonly afterSubmit = output();

  readonly fields = [
    { name: 'label', defaultValue: '', validators: [Validators.required] },
    {
      name: 'description',
      defaultValue: '',
      validators: [Validators.required],
    },
    {
      name: 'price',
      defaultValue: '',
      validators: [Validators.required, Validators.min(0)],
    },
    {
      name: 'default_duration',
      defaultValue: '',
      validators: [Validators.required, Validators.min(0)],
    },
    { name: 'category', defaultValue: '', validators: [Validators.required] },
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
    {
      id: 'description',
      label: 'Description',
      type: 'text-area',
      controleName: 'description',
      isSubmitted: this.form.isSubmitted,
      form: this.form.formGroup,
      messages: [
        { message: 'La description est requise.', validator: 'required' },
      ],
    },
    {
      id: 'price',
      label: 'Prix',
      type: 'number',
      controleName: 'price',
      isSubmitted: this.form.isSubmitted,
      form: this.form.formGroup,
      messages: [
        { message: 'Le prix est requis.', validator: 'required' },
        { message: 'Le prix doit être un nombre positif.', validator: 'min' },
      ],
    },
    {
      id: 'default_duration',
      label: 'Durée (heure)',
      type: 'number',
      controleName: 'default_duration',
      isSubmitted: this.form.isSubmitted,
      form: this.form.formGroup,
      messages: [
        { message: 'La durée est requise.', validator: 'required' },
        {
          message: 'La durée doit être un nombre positif.',
          validator: 'min',
        },
      ],
    },
    {
      id: 'category',
      label: 'Catégorie de service',
      type: 'select',
      controleName: 'category',
      isSubmitted: this.form.isSubmitted,
      form: this.form.formGroup,
      messages: [
        {
          message: 'La categorié de service est requise.',
          validator: 'required',
        },
      ],
    },
  ];
  readonly names = this.fieldsControls.filter(
    (element) => element.id === 'label' || element.id === 'description'
  );
  readonly numbers = this.fieldsControls.filter(
    (element) => element.id === 'price' || element.id === 'default_duration'
  );
  readonly category = this.fieldsControls.filter(
    (element) => element.id === 'category'
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

      const service = this.form.formGroup.value as ServiceFromForm;
      this.servicesService
        .saveService(service)
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
            'Service enregistré',
            `Le service a bien été sauvegardé`
          );
          this.handleClose();
          this.afterSubmit.emit();
        });
    }
  }
}
