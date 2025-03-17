import { Component, inject, output, signal } from '@angular/core';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { Award, LucideAngularModule, X } from 'lucide-angular';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { SkillService } from '../../../../services/mechanic/skill.service';
import { Skill } from '../../../../models/mechanic/skill.model';
import { catchError, finalize } from 'rxjs';
import { Response } from '../../../../models/response.model';
import { toast } from '../../../../components/toast/toast.component';
import { createForm } from 'src/app/utils/create-form';
import { ControlledInputComponent } from 'src/app/components/controlled-input/controlled-input.component';

@Component({
  selector: 'skill-save',
  imports: [
    ModalComponent,
    ButtonComponent,
    LucideAngularModule,
    ReactiveFormsModule,
    NgClass,
    ControlledInputComponent,
  ],
  templateUrl: './employee-save.component.html',
  styles: ``,
})
export class SkillSaveComponent {
  readonly skillService = inject(SkillService);

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

  handleClose() {
    this.close.emit();
  }

  async handleSubmit() {
    this.form.isSubmitted.set(true);
    if (this.form.formGroup.valid) {
      this.form.isSending.set(true);

      const { value: skill } = this.form.formGroup;
      this.skillService
        .save(skill as Skill)
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
            'Compétence enregistrée',
            `La compétence a bien été sauvegardée`
          );
          this.handleClose();
          this.afterSubmit.emit();
        });
    }
  }
}
