import { Component } from '@angular/core';
import { CarsTypeSection } from './cars-type/cars-type.component';
import { BrandSection } from './brand/brand.component';

@Component({
  selector: 'services',
  imports: [CarsTypeSection, BrandSection],
  templateUrl: './cars.component.html',
  styles: ``,
})
export class CarsPage {}
