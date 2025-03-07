import { inject, Injectable } from '@angular/core';

import { User } from '../models/auth/user.model';
import { apiUrl } from '../utils/url';
import { Response } from '../models/response.model';
import { HttpClient } from '@angular/common/http';

type ResponseData = {
  user: User;
  token: string;
};
type SignupResponse = Response<ResponseData>;

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  readonly http = inject(HttpClient);

  signupHttp(user: User) {
    return this.http.post<SignupResponse>(`${apiUrl}/auth/register`, user);
  }
}
