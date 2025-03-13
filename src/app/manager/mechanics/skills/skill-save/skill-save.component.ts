import { Component, inject, output, signal } from '@angular/core';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { Award, LucideAngularModule, X } from 'lucide-angular';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { SkillService } from '../../../../services/mechanic/skill.service';
import { Skill } from '../../../../models/mechanic/skill.model';
import { catchError, finalize } from 'rxjs';
import { Response } from '../../../../models/response.model';
import { toast } from '../../../../components/toast/toast.component';

@Component({
  selector: 'skill-save',
  imports: [
    ModalComponent,
    ButtonComponent,
    LucideAngularModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './skill-save.component.html',
  styles: ``,
})
export class SkillSaveComponent {
  readonly skillService = inject(SkillService);

  readonly cross = X;
  readonly award = Award;

  readonly close = output();
  readonly afterSubmit = output();

  readonly isSubmitted = signal<boolean>(false);
  readonly isSending = signal<boolean>(false);
  readonly message = signal<string>('');
  readonly form = new FormGroup({
    label: new FormControl('', [Validators.required]),
  });

  handleClose() {
    this.close.emit();
  }

  async handleSubmit() {
    this.isSubmitted.set(true);
    if (this.form.valid) {
      this.isSending.set(true);

      const { value: skill } = this.form;
      this.skillService
        .save(skill as Skill)
        .pipe(
          catchError((e) => {
            const error = e.error as Response<undefined>;
            this.message.set(error.message);
            throw e;
          }),
          finalize(() => {
            this.isSending.set(false);
          })
        )
        .subscribe(() => {
          toast(
            'success',
            'Sauvegarde réussie',
            `La compétence a bien été sauvegardée`
          );
          this.handleClose();
          this.afterSubmit.emit();
        });
    }
  }
}
