import { Component, input, signal } from '@angular/core';
import { User } from '../../models/auth/user.model';
import { userDataStoreName } from '../../utils/sotre';
import {
  PrivateNacigationLink,
  PrivateNavigationItemComponent,
} from './private-navigation-item/private-navigation-item.component';

@Component({
  selector: 'private-navigation',
  imports: [PrivateNavigationItemComponent],
  templateUrl: './private-navigation.component.html',
  styles: ``,
})
export class PrivateNavigationComponent {
  readonly role = input.required<string>();
  readonly links = input.required<PrivateNacigationLink[]>();

  readonly storedUser = localStorage.getItem(userDataStoreName);
  readonly user = signal<User | null>(
    this.storedUser ? (JSON.parse(this.storedUser) as User) : null
  );
}
