import { Component, inject, OnInit, signal } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { BriefcaseBusiness, LucideAngularModule, Wrench } from 'lucide-angular';
import { Pageable } from 'src/app/models/pageable.model';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { StatePaginationComponent } from 'src/app/components/state-pagination/state-pagination.component';
import { CarTypeService } from 'src/app/services/clients/car-type.service';
import { CarType } from 'src/app/models/clients/car-type.model';
import { CarsTypeListComponent } from './cars-type-list/cars-type-list.component';
import { CarsTypeSaveComponent } from './cars-type-save/cars-type-save.component';

@Component({
  selector: 'cars-type-section',
  imports: [
    LucideAngularModule,
    ButtonComponent,
    StatePaginationComponent,
    CarsTypeListComponent,
    CarsTypeSaveComponent,
  ],
  templateUrl: './cars-type.component.html',
  styles: ``,
})
export class CarsTypeSection implements OnInit {
  readonly wrench = Wrench;
  readonly briefCase = BriefcaseBusiness;

  readonly catTypeService = inject(CarTypeService);

  readonly isSave = signal<boolean>(false);

  readonly isFindLoading = signal<boolean>(true);
  readonly page = signal<number>(1);
  readonly carsType = signal<CarType[]>([]);
  readonly pageable = signal<Pageable>({} as Pageable);

  ngOnInit(): void {
    this.findAll();
  }

  toggleSave() {
    this.isSave.set(!this.isSave());
  }

  findAll() {
    this.isFindLoading.set(true);
    this.catTypeService
      .find(this.page() || 1)
      .pipe(
        catchError((e) => {
          throw e;
        }),
        finalize(() => {
          this.isFindLoading.set(false);
        })
      )
      .subscribe((response) => {
        this.carsType.set(response.data.types);
        this.pageable.set(response.data as Pageable);
      });
  }
}
