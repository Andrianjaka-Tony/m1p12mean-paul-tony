import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../models/auth/user.model';
import { apiUrl } from '../../utils/url';

import { SignResponse } from './sign.service';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  readonly http = inject(HttpClient);

  signup(user: User) {
    return this.http.post<SignResponse>(`${apiUrl}/auth/register`, user);
  }
}
