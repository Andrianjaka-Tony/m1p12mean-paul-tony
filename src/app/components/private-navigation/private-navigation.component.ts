import { Component, inject, input, signal } from '@angular/core';
import { User } from '../../models/auth/user.model';
import { userDataStoreName } from '../../utils/sotre';
import {
  PrivateNacigationLink,
  PrivateNavigationItemComponent,
} from './private-navigation-item/private-navigation-item.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { SignService } from 'src/app/services/auth/sign.service';

@Component({
  selector: 'private-navigation',
  imports: [PrivateNavigationItemComponent, AvatarComponent],
  templateUrl: './private-navigation.component.html',
  styles: ``,
})
export class PrivateNavigationComponent {
  readonly signService = inject(SignService);

  readonly role = input.required<string>();
  readonly links = input.required<PrivateNacigationLink[]>();

  readonly storedUser = localStorage.getItem(userDataStoreName);
  readonly user = signal<User | null>(
    this.storedUser ? (JSON.parse(this.storedUser) as User) : null
  );
}
