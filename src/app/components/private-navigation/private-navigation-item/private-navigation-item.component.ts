import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

export type PrivateNacigationLink = {
  href: string;
  label: string;
};

@Component({
  selector: 'private-navigation-item',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './private-navigation-item.component.html',
  styles: ``,
})
export class PrivateNavigationItemComponent {
  readonly link = input.required<PrivateNacigationLink>();
}
