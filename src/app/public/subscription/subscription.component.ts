import { Component } from '@angular/core';

import { SubscriptionComponent } from '../../components/subscription/subscription.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-subscription',
  imports: [SubscriptionComponent, FooterComponent],
  templateUrl: './subscription.component.html',
  styles: ``,
})
export class SubscriptionPage {}
