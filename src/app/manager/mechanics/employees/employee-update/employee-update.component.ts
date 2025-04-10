import { Component, inject, input, OnInit, output } from '@angular/core';
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
import { ControlledInputComponent } from '../../../../components/controlled-input/controlled-input.component';

@Component({
  selector: 'skill-update',
  imports: [
    ModalComponent,
    ButtonComponent,
    LucideAngularModule,
    ReactiveFormsModule,
    NgClass,
    ControlledInputComponent,
  ],
  templateUrl: './employee-update.component.html',
  styles: ``,
})
export class SkillUpdateComponent implements OnInit {
  readonly skillService = inject(SkillService);

  readonly cross = X;
  readonly award = Award;

  readonly skill = input<Skill>({} as Skill);

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

  ngOnInit(): void {
    this.form.formGroup.setValue({ label: this.skill().label });
  }

  async handleSubmit() {
    this.form.isSubmitted.set(true);
    if (this.form.formGroup.valid) {
      this.form.isSending.set(true);

      const skill = this.form.formGroup.value as Skill;
      skill._id = this.skill()._id;
      this.skillService
        .update(skill as Skill)
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
            'Compétence modifiée',
            `La compétence a bien été modifièe`
          );
          this.close.emit();
          this.afterSubmit.emit();
        });
    }
  }
}
