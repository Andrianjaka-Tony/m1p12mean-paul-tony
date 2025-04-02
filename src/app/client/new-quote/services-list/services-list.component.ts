import { Component, input, output, WritableSignal } from '@angular/core';

import {
  Ellipsis,
  Eye,
  LucideAngularModule,
  Settings,
  Trash2,
} from 'lucide-angular';
import { NumberFormatPipe } from 'src/app/pipes/number-format.pipe';
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
import { QuantityButtonsComponent } from '../quantity-buttons/quantity-buttons.component';
import { ServiceQuantity } from '../new-quote.component';

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
    QuantityButtonsComponent,
  ],
  templateUrl: './services-list.component.html',
  styles: ``,
})
export class ServicesListComponent {
  readonly eye = Eye;
  readonly settings = Settings;
  readonly trash = Trash2;
  readonly ellipsis = Ellipsis;

  readonly add = output<string>();
  readonly remove = output<string>();

  readonly isLoading = input.required<boolean>();
  readonly services = input.required<Service[]>();
  readonly quantities = input.required<WritableSignal<ServiceQuantity>>();

  // readonly isUpdating = signal<boolean>(false);
  // readonly defaultEmployeeToUpdate = signal<Employee>({} as Employee);

  readonly afterChange = output();

  // closeUpdate() {
  //   this.defaultEmployeeToUpdate.set({} as Employee);
  //   this.isUpdating.set(false);
  // }
}
