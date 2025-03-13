import { Component, input, WritableSignal } from '@angular/core';

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
} from '../../../../components/popover/popover.component';
import { LucideAngularModule, Settings, Trash2 } from 'lucide-angular';

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
    LucideAngularModule,
  ],
  templateUrl: './skills-list.component.html',
  styles: ``,
})
export class SkillsListComponent {
  readonly Math = Math;
  readonly settings = Settings;
  readonly trash = Trash2;

  readonly isLoading = input.required<boolean>();
  readonly skills = input.required<Skill[]>();
}
