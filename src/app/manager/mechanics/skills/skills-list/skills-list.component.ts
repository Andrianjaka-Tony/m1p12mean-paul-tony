import { Component, inject, input, output, signal } from '@angular/core';

import {
  TableBodyComponent,
  TableCellComponent,
  TableComponent,
  TableHeadComponent,
  TableHeaderComponent,
  TableRowComponent,
} from '../../../../components/table/table.component';

import { Skill } from '../../../../models/mechanic/skill.model';
import { SkeletonComponent } from '../../../../components/skeleton/skeleton.component';
import {
  PopoverComponent,
  PopoverTriggerComponent,
  PopoverContentComponent,
  PopoverItemsContainerComponent,
  PopoverItemComponent,
  PopoverCloseComponent,
} from '../../../../components/popover/popover.component';
import {
  Ellipsis,
  LucideAngularModule,
  Settings,
  Trash2,
} from 'lucide-angular';
import { SkillService } from '../../../../services/mechanic/skill.service';
import { catchError } from 'rxjs';
import { Response } from '../../../../models/response.model';
import { toast } from '../../../../components/toast/toast.component';
import { SkillUpdateComponent } from '../skill-update/skill-update.component';

@Component({
  selector: 'skills-list',
  imports: [
    TableComponent,
    TableHeaderComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableRowComponent,
    TableCellComponent,
    SkeletonComponent,
    PopoverComponent,
    PopoverTriggerComponent,
    PopoverContentComponent,
    PopoverItemsContainerComponent,
    PopoverItemComponent,
    PopoverCloseComponent,
    LucideAngularModule,
    SkillUpdateComponent,
  ],
  templateUrl: './skills-list.component.html',
  styles: ``,
})
export class SkillsListComponent {
  readonly skillService = inject(SkillService);

  readonly Math = Math;
  readonly settings = Settings;
  readonly trash = Trash2;
  readonly ellipsis = Ellipsis;

  readonly isLoading = input.required<boolean>();
  readonly skills = input.required<Skill[]>();

  readonly isUpdating = signal<boolean>(false);
  readonly defaultSkillToUpdate = signal<Skill>({} as Skill);

  readonly afterChange = output();

  handleDelete(skill: Skill) {
    this.skillService
      .delete(skill._id || '')
      .pipe(
        catchError((e) => {
          const error = e.error as Response<undefined>;
          toast('error', 'Erreur', error.message);
          throw e;
        })
      )
      .subscribe(() => {
        toast(
          'success',
          'Compétence supprimée',
          `La compétence a bien ètè supprimée`
        );
        this.afterChange.emit();
      });
  }

  openUpdate(skill: Skill) {
    this.defaultSkillToUpdate.set(skill);
    this.isUpdating.set(true);
  }

  closeUpdate() {
    this.defaultSkillToUpdate.set({} as Skill);
    this.isUpdating.set(false);
  }
}
