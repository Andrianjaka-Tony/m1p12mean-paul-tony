import { Component, inject, OnInit, signal } from '@angular/core';
import { CarListComponent } from './car-list/car-list.component';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { OverviewHeaderComponent } from './overview-header/overview-header.component';
import { CarService } from 'src/app/services/clients/car.service';
import { CarFromClient } from 'src/app/models/clients/car.model';
import { QuoteFromFind } from 'src/app/models/clients/quote.model';

@Component({
  selector: 'overview-page',
  imports: [CarListComponent, QuoteListComponent, OverviewHeaderComponent],
  templateUrl: './overview.component.html',
  styles: ``,
})
export class OverviewPage implements OnInit {
  readonly carService = inject(CarService);

  readonly cars = signal<CarFromClient[]>([]);
  readonly isLoadingCars = signal<boolean>(true);

  readonly quotes = signal<QuoteFromFind[]>([]);

  ngOnInit(): void {
    this.findCars();
  }

  findCars() {
    this.isLoadingCars.set(true);
    this.carService.findCarsByClient().subscribe((response) => {
      this.isLoadingCars.set(false);
      this.cars.set(response.data);
    });
  }
}
