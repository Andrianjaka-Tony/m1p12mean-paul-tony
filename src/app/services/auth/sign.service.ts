import { Injectable, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/auth/user.model';
import { Response } from '../../models/response.model';
import { userDataStoreName, userTokenStoreName } from '../../utils/sotre';

type ResponseData = {
  user: User;
  token: string;
};
export type SignResponse = Response<ResponseData>;

@Injectable({
  providedIn: 'root',
})
export class SignService {
  constructor(private router: Router) {}

  saveUserData(data: ResponseData, message: WritableSignal<string>): void {
    message.set('');
    localStorage.setItem(userDataStoreName, JSON.stringify(data.user));
    localStorage.setItem(userTokenStoreName, data.token);
  }

  redirect(data: ResponseData): void {
    const { role } = data.user;
    this.router.navigate([`/${role?.label}`]);
  }
}
