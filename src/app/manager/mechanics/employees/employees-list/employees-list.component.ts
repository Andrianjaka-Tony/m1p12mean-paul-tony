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
  User,
} from 'lucide-angular';
import { SkillService } from '../../../../services/mechanic/skill.service';
import { catchError } from 'rxjs';
import { Response } from '../../../../models/response.model';
import { toast } from '../../../../components/toast/toast.component';
import { SkillUpdateComponent } from '../employee-update/employee-update.component';
import { EmployeeService } from 'src/app/services/mechanic/employee.service';
import { Employee } from 'src/app/models/mechanic/employee.model';
import { AvatarComponent } from '../../../../components/avatar/avatar.component';
import { NumberFormatPipe } from 'src/app/pipes/number-format.pipe';

@Component({
  selector: 'employees-list',
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
    AvatarComponent,
    NumberFormatPipe,
  ],
  templateUrl: './employees-list.component.html',
  styles: ``,
})
export class EmployeesListComponent {
  readonly employeeService = inject(EmployeeService);

  readonly Math = Math;
  readonly user = User;
  readonly settings = Settings;
  readonly trash = Trash2;
  readonly ellipsis = Ellipsis;

  readonly isLoading = input.required<boolean>();
  readonly employees = input.required<Employee[]>();

  readonly isUpdating = signal<boolean>(false);
  readonly defaultSkillToUpdate = signal<Skill>({} as Skill);

  readonly afterChange = output();

  // openUpdate(employee: Employee) {
  //   this.defaultSkillToUpdate.set(employee);
  //   this.isUpdating.set(true);
  // }

  closeUpdate() {
    this.defaultSkillToUpdate.set({} as Skill);
    this.isUpdating.set(false);
  }
}
