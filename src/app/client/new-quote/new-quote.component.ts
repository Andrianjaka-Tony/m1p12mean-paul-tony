import { Component, inject, OnInit, signal } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { Service } from 'src/app/models/mechanic/services.model';
import { Pageable } from 'src/app/models/pageable.model';
import { ServicesService } from 'src/app/services/mechanic/services.service';
import { ServicesListComponent } from './services-list/services-list.component';
import { StatePaginationComponent } from '../../components/state-pagination/state-pagination.component';

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
        console.log(response.data.services);
        this.services.set(response.data.services);
        this.pageable.set(response.data as Pageable);
      });
  }
}
