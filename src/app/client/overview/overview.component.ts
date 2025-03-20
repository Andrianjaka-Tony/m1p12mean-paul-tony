import { Component, inject, OnInit, signal } from '@angular/core';
import { CarListComponent } from './car-list/car-list.component';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { OverviewHeaderComponent } from './overview-header/overview-header.component';
import { CarService } from 'src/app/services/clients/car.service';
import { CarFromClient } from 'src/app/models/clients/car.model';

@Component({
  selector: 'overview-page',
  imports: [CarListComponent, QuoteListComponent, OverviewHeaderComponent],
  templateUrl: './overview.component.html',
  styles: ``,
})
export class OverviewPage implements OnInit {
  readonly carService = inject(CarService);

  readonly cars = signal<CarFromClient[]>([]);

  ngOnInit(): void {
    this.findCars();
  }

  findCars() {
    this.carService.findCarsByClient().subscribe((response) => {
      this.cars.set(response.data);
    });
  }
}
