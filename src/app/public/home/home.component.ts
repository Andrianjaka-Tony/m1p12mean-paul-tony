import { Component } from '@angular/core';

import { HeroComponent } from '../../components/hero/hero.component';
import { ServicesComponent } from '../../components/services/services.component';
import { ProcessComponent } from '../../components/process/process.component';
import { SubscriptionComponent } from '../../components/subscription/subscription.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    ServicesComponent,
    ProcessComponent,
    SubscriptionComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomePage {}
