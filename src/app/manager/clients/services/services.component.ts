import { Component } from '@angular/core';
import { ServicesSection } from './services/services.component';
import { ServiceCategorisSection } from './service-categories/service-categories.component';

@Component({
  selector: 'services',
  imports: [ServicesSection, ServiceCategorisSection],
  templateUrl: './services.component.html',
  styles: ``,
})
export class ServicesPage {}
