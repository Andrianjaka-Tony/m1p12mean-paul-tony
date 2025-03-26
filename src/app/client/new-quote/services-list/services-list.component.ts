import { Component, inject, input, output } from '@angular/core';

import {
  Ellipsis,
  Eye,
  LucideAngularModule,
  Settings,
  Trash2,
} from 'lucide-angular';
import { NumberFormatPipe } from 'src/app/pipes/number-format.pipe';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/mechanic/services.model';
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

@Component({
  selector: 'services-list',
  imports: [
    TableComponent,
    TableHeaderComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableRowComponent,
    TableCellComponent,
    SkeletonComponent,
    LucideAngularModule,
    NumberFormatPipe,
  ],
  templateUrl: './services-list.component.html',
  styles: ``,
})
export class ServicesListComponent {
  readonly router = inject(Router);

  readonly eye = Eye;
  readonly settings = Settings;
  readonly trash = Trash2;
  readonly ellipsis = Ellipsis;

  readonly isLoading = input.required<boolean>();
  readonly services = input.required<Service[]>();

  // readonly isUpdating = signal<boolean>(false);
  // readonly defaultEmployeeToUpdate = signal<Employee>({} as Employee);

  readonly afterChange = output();

  // closeUpdate() {
  //   this.defaultEmployeeToUpdate.set({} as Employee);
  //   this.isUpdating.set(false);
  // }

  goToDetails(id: string | undefined) {
    this.router.navigate([`/manager/clients/services/details/${id}`]);
  }
}
