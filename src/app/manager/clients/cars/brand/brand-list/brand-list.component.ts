import { Component, inject, input, output } from '@angular/core';

import {
  Ellipsis,
  Eye,
  LucideAngularModule,
  Settings,
  Trash2,
} from 'lucide-angular';
import { EmployeeService } from 'src/app/services/mechanic/employee.service';
import { Router } from '@angular/router';
import { SkeletonComponent } from 'src/app/components/skeleton/skeleton.component';
import {
  TableBodyComponent,
  TableCellComponent,
  TableComponent,
  TableHeadComponent,
  TableHeaderComponent,
  TableRowComponent,
} from 'src/app/components/table/table.component';
import {
  PopoverCloseComponent,
  PopoverComponent,
  PopoverContentComponent,
  PopoverItemComponent,
  PopoverItemsContainerComponent,
  PopoverTriggerComponent,
} from 'src/app/components/popover/popover.component';
import { Brand } from 'src/app/models/clients/brand.model';

@Component({
  selector: 'brand-list',
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
  ],
  templateUrl: './brand-list.component.html',
  styles: ``,
})
export class BrandListComponent {
  readonly employeeService = inject(EmployeeService);
  readonly router = inject(Router);

  readonly eye = Eye;
  readonly settings = Settings;
  readonly trash = Trash2;
  readonly ellipsis = Ellipsis;

  readonly isLoading = input.required<boolean>();
  readonly brands = input.required<Brand[]>();

  // readonly isUpdating = signal<boolean>(false);
  // readonly defaultEmployeeToUpdate = signal<Employee>({} as Employee);

  readonly afterChange = output();

  // closeUpdate() {
  //   this.defaultEmployeeToUpdate.set({} as Employee);
  //   this.isUpdating.set(false);
  // }

  // goToProfile(id: string | undefined) {
  //   this.router.navigate([`/manager/mechanics/employees/profile/${id}`]);
  // }
}
