import { Component, inject, output, signal } from '@angular/core';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { Award, LucideAngularModule, X } from 'lucide-angular';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { catchError, finalize } from 'rxjs';
import { Response } from '../../../../models/response.model';
import { toast } from '../../../../components/toast/toast.component';
import { createForm } from 'src/app/utils/create-form';
import { ControlledInputComponent } from 'src/app/components/controlled-input/controlled-input.component';
import {
  EmployeeSave,
  EmployeeService,
} from 'src/app/services/mechanic/employee.service';
import { Employee } from 'src/app/models/mechanic/employee.model';

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
export class EmployeeSaveComponent {
  readonly employeeService = inject(EmployeeService);

  readonly cross = X;
  readonly award = Award;

  readonly close = output();
  readonly afterSubmit = output();

  readonly fields = [
    { name: 'lastname', defaultValue: '', validators: [Validators.required] },
    { name: 'firstname', defaultValue: '', validators: [Validators.required] },
    {
      name: 'email',
      defaultValue: '',
      validators: [Validators.required, Validators.email],
    },
    {
      name: 'password',
      defaultValue: '',
      validators: [Validators.required, Validators.minLength(8)],
    },
    {
      name: 'salary',
      defaultValue: '',
      validators: [Validators.required, Validators.min(0)],
    },
  ];
  readonly form = createForm(this.fields);
  readonly fieldsControls = [
    {
      id: 'lastname',
      label: 'Nom',
      type: 'text',
      controleName: 'lastname',
      isSubmitted: this.form.isSubmitted,
      form: this.form.formGroup,
      messages: [{ message: 'Le nom est requis.', validator: 'required' }],
    },
    {
      id: 'firstname',
      label: 'Prénom',
      type: 'text',
      controleName: 'firstname',
      isSubmitted: this.form.isSubmitted,
      form: this.form.formGroup,
      messages: [{ message: 'Le prénom est requis.', validator: 'required' }],
    },
    {
      id: 'email',
      label: 'Adresse email',
      type: 'email',
      controleName: 'email',
      isSubmitted: this.form.isSubmitted,
      form: this.form.formGroup,
      messages: [
        { message: "L'email est requis.", validator: 'required' },
        { message: "L'email est invalide.", validator: 'email' },
      ],
    },
    {
      id: 'password',
      label: 'Mot de passe',
      type: 'password',
      controleName: 'password',
      isSubmitted: this.form.isSubmitted,
      form: this.form.formGroup,
      messages: [
        { message: 'Le mot de passe est requis.', validator: 'required' },
        {
          message: 'Le mot de passe doit contenir au moins 8 caractères.',
          validator: 'minlength',
        },
      ],
    },
    {
      id: 'salary',
      label: 'Salaire',
      type: 'number',
      controleName: 'salary',
      isSubmitted: this.form.isSubmitted,
      form: this.form.formGroup,
      messages: [
        { message: 'Le salaire est requis.', validator: 'required' },
        {
          message: 'Le salaire doit être un nombre positif.',
          validator: 'min',
        },
      ],
    },
  ];
  readonly names = this.fieldsControls.filter(
    (element) => element.id === 'lastname' || element.id === 'firstname'
  );
  readonly informations = this.fieldsControls.filter(
    (element) =>
      element.id === 'email' ||
      element.id === 'password' ||
      element.id === 'salary'
  );

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
