import { Component, inject, input, output, signal } from '@angular/core';

import {
  TableBodyComponent,
  TableCellComponent,
  TableComponent,
  TableHeadComponent,
  TableHeaderComponent,
  TableRowComponent,
} from '../../../../components/table/table.component';

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
import { EmployeeService } from 'src/app/services/mechanic/employee.service';
import { Employee } from 'src/app/models/mechanic/employee.model';
import { AvatarComponent } from '../../../../components/avatar/avatar.component';
import { NumberFormatPipe } from 'src/app/pipes/number-format.pipe';
import { Router, RouterLink } from '@angular/router';

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
  readonly router = inject(Router);

  readonly Math = Math;
  readonly user = User;
  readonly settings = Settings;
  readonly trash = Trash2;
  readonly ellipsis = Ellipsis;

  readonly isLoading = input.required<boolean>();
  readonly employees = input.required<Employee[]>();

  readonly isUpdating = signal<boolean>(false);
  readonly defaultEmployeeToUpdate = signal<Employee>({} as Employee);

  readonly afterChange = output();

  closeUpdate() {
    this.defaultEmployeeToUpdate.set({} as Employee);
    this.isUpdating.set(false);
  }

  goToProfile(id: string | undefined) {
    this.router.navigate([`/manager/mechanics/employees/profile/${id}`]);
  }
}
