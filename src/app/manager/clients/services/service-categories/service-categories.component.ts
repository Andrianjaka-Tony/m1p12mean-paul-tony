import { Component, inject, OnInit, signal } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { LucideAngularModule, Wrench } from 'lucide-angular';
import { Pageable } from 'src/app/models/pageable.model';
import { ServiceCategory } from 'src/app/models/mechanic/services.model';
import { ServicesService } from 'src/app/services/mechanic/services.service';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { StatePaginationComponent } from 'src/app/components/state-pagination/state-pagination.component';
import { ServiceCategoriesListComponent } from './service-categories-list/service-categories-list.component';
import { ServiceCategorySaveComponent } from './service-save/service-save.component';

@Component({
  selector: 'service-categories-section',
  imports: [
    LucideAngularModule,
    ServiceCategoriesListComponent,
    ButtonComponent,
    StatePaginationComponent,
    ServiceCategorySaveComponent,
  ],
  templateUrl: './service-categories.component.html',
  styles: ``,
})
export class ServiceCategorisSection implements OnInit {
  readonly wrench = Wrench;

  readonly servicesService = inject(ServicesService);

  readonly isSave = signal<boolean>(false);

  readonly isFindLoading = signal<boolean>(true);
  readonly page = signal<number>(1);
  readonly serviceCategories = signal<ServiceCategory[]>([]);
  readonly pageable = signal<Pageable>({} as Pageable);

  ngOnInit(): void {
    this.findAll();
  }

  toggleSave() {
    this.isSave.set(!this.isSave());
  }

  findAll() {
    this.isFindLoading.set(true);
    this.servicesService
      .findServiceCategories(this.page() || 1)
      .pipe(
        catchError((e) => {
          throw e;
        }),
        finalize(() => {
          this.isFindLoading.set(false);
        })
      )
      .subscribe((response) => {
        this.serviceCategories.set(response.data.categories);
        this.pageable.set(response.data as Pageable);
      });
  }
}
