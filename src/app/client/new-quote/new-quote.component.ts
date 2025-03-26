import { Component, inject, OnInit, signal } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { Service } from 'src/app/models/mechanic/services.model';
import { Pageable } from 'src/app/models/pageable.model';
import { ServicesService } from 'src/app/services/mechanic/services.service';
import { ServicesListComponent } from './services-list/services-list.component';
import { StatePaginationComponent } from '../../components/state-pagination/state-pagination.component';

export type ServiceQuantity = {
  [key: string]: number;
};

@Component({
  selector: 'new-quote',
  imports: [ServicesListComponent, StatePaginationComponent],
  templateUrl: './new-quote.component.html',
  styles: ``,
})
export class NewQuotePage implements OnInit {
  readonly servicesService = inject(ServicesService);

  readonly isLoading = signal<boolean>(true);
  readonly page = signal<number>(1);
  readonly services = signal<Service[]>([] as Service[]);
  readonly pageable = signal<Pageable>({} as Pageable);

  readonly quantities = signal<ServiceQuantity>({} as ServiceQuantity);

  ngOnInit(): void {
    this.findServices();
  }

  findServices() {
    this.isLoading.set(true);
    this.servicesService
      .findServices(this.page() || 1)
      .pipe(
        catchError((e) => {
          throw e;
        }),
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe((response) => {
        this.services.set(response.data.services);
        this.pageable.set(response.data as Pageable);
      });
  }

  add(service: string) {
    console.log('Add');
    const quantity: number | undefined = this.quantities()[service];
    if (!quantity) {
      this.quantities.set({ ...this.quantities(), [service]: 1 });
      return;
    }

    this.quantities.set({ ...this.quantities(), [service]: quantity + 1 });
  }

  remove(service: string) {
    console.log('Remove');
    const quantity: number | undefined = this.quantities()[service];

    if (!quantity) {
      return;
    }

    if (quantity === 1) {
      this.quantities.set({ ...this.quantities(), [service]: 0 });
      return;
    }

    this.quantities.set({ ...this.quantities(), [service]: quantity - 1 });
  }
}
