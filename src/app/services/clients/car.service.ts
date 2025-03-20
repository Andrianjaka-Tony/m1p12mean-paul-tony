import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from 'src/app/models/auth/user.model';
import { CarFromClient, CarFromForm } from 'src/app/models/clients/car.model';
import { Response } from 'src/app/models/response.model';
import { createHeaders } from 'src/app/utils/headers';
import { userDataStoreName, userTokenStoreName } from 'src/app/utils/sotre';
import { apiUrl } from 'src/app/utils/url';
import { SignService } from '../auth/sign.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  readonly signService = inject(SignService);
  readonly http = inject(HttpClient);

  save(car: CarFromForm) {
    const headers = createHeaders();

    const client = JSON.parse(
      localStorage.getItem(userDataStoreName) || '{}'
    ) as { _id: string } & User;
    car.id_client = client._id;

    return this.http.post<Response<undefined>>(
      `${apiUrl}/api/client_vehicle`,
      car,
      { headers }
    );
  }

  findCarsByClient() {
    const headers = createHeaders();
    const token = localStorage.getItem(userTokenStoreName);
    if (!token) {
      this.signService.signOut();
      return of(undefined);
    }

    return this.http.get<Response<CarFromClient[]>>(
      `${apiUrl}/api/client_vehicle/user/${token}`,
      { headers }
    );
  }
}
