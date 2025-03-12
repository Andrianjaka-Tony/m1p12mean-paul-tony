import { Component, output } from '@angular/core';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { Award, LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'skill-save',
  imports: [ModalComponent, ButtonComponent, LucideAngularModule],
  templateUrl: './skill-save.component.html',
  styles: ``,
})
export class SkillSaveComponent {
  readonly cross = X;
  readonly award = Award;

  readonly close = output();

  handleClose() {
    this.close.emit();
  }
}
