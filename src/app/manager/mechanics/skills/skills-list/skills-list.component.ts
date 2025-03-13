import {
  Component,
  inject,
  input,
  output,
  WritableSignal,
} from '@angular/core';

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
import { Settings, Trash2 } from 'lucide-angular';
import { SkillService } from '../../../../services/mechanic/skill.service';
import { catchError } from 'rxjs';
import { Response } from '../../../../models/response.model';
import { toast } from '../../../../components/toast/toast.component';

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
  ],
  templateUrl: './skills-list.component.html',
  styles: ``,
})
export class SkillsListComponent {
  readonly skillService = inject(SkillService);

  readonly Math = Math;
  readonly settings = Settings;
  readonly trash = Trash2;

  readonly isLoading = input.required<boolean>();
  readonly skills = input.required<Skill[]>();

  readonly afterDelete = output();

  hello() {
    console.log('hello');
  }

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
        this.afterDelete.emit();
      });
  }
}
