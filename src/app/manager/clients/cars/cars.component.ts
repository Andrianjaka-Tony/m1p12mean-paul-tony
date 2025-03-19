import { Component } from '@angular/core';
import { CarsTypeSection } from './cars-type/cars-type.component';

@Component({
  selector: 'services',
  imports: [CarsTypeSection],
  templateUrl: './cars.component.html',
  styles: ``,
})
export class CarsPage {}
