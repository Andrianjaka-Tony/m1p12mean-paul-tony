import { Component, inject, OnInit, output } from '@angular/core';
import { Award, LucideAngularModule, X } from 'lucide-angular';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { catchError, finalize } from 'rxjs';
import { createForm } from 'src/app/utils/create-form';
import { ControlledInputComponent } from 'src/app/components/controlled-input/controlled-input.component';
import {
  EmployeeSave,
  EmployeeService,
} from 'src/app/services/mechanic/employee.service';
import { Employee } from 'src/app/models/mechanic/employee.model';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { toast } from 'src/app/components/toast/toast.component';
import { Response } from 'src/app/models/response.model';
import { ServiceCategory } from 'src/app/models/mechanic/services.model';
import { ServicesService } from 'src/app/services/mechanic/services.service';

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
export class EmployeeSaveComponent implements OnInit {
  readonly employeeService = inject(EmployeeService);
  readonly servicesService = inject(ServicesService);

  readonly cross = X;
  readonly award = Award;

  readonly serviceCategories: ServiceCategory[] = [] as ServiceCategory[];

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
        { message: 'La durée des travaux est requise.', validator: 'required' },
        {
          message: 'La durée des travaux doit être un nombre positif.',
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

  ngOnInit(): void {}

  handleClose() {
    this.close.emit();
  }

  getEmploye() {
    const { value } = this.form.formGroup;
    const employee: unknown = {
      user: value as Employee,
      employe: {
        salary: this.form.formGroup.get('salary')?.value || 0,
        skills: [],
      },
    };
    return employee as EmployeeSave;
  }

  handleSubmit() {
    this.form.isSubmitted.set(true);
    if (this.form.formGroup.valid) {
      this.form.isSending.set(true);

      const employee = this.getEmploye();
      this.employeeService
        .save(employee)
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
            'Employé enregistrée',
            `L'employé a bien été sauvegardée`
          );
          this.handleClose();
          this.afterSubmit.emit();
        });
    }
  }
}
