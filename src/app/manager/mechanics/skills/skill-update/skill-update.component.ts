import {
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
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
  selector: 'skill-update',
  imports: [
    ModalComponent,
    ButtonComponent,
    LucideAngularModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './skill-update.component.html',
  styles: ``,
})
export class SkillUpdateComponent implements OnInit {
  readonly skillService = inject(SkillService);

  readonly cross = X;
  readonly award = Award;

  readonly skill = input<Skill>({} as Skill);

  readonly close = output();
  readonly afterSubmit = output();

  readonly isSubmitted = signal<boolean>(false);
  readonly isSending = signal<boolean>(false);
  readonly message = signal<string>('');
  readonly form = new FormGroup({
    label: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.form.setValue({ label: this.skill().label });
  }

  async handleSubmit() {
    this.isSubmitted.set(true);
    if (this.form.valid) {
      this.isSending.set(true);

      const skill = this.form.value as Skill;
      skill._id = this.skill()._id;
      this.skillService
        .update(skill as Skill)
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
            'Compétence modifiée',
            `La compétence a bien été modifièe`
          );
          this.close.emit();
          this.afterSubmit.emit();
        });
    }
  }
}
