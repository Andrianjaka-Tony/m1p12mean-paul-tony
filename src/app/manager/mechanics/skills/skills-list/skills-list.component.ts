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
  ],
  templateUrl: './skills-list.component.html',
  styles: ``,
})
export class SkillsListComponent {
  readonly Math = Math;

  readonly isLoading = input.required<boolean>();
  readonly skills = input.required<Skill[]>();
}
