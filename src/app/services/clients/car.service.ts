import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from 'src/app/models/auth/user.model';
import { CarFromForm } from 'src/app/models/clients/car.model';
import { Response } from 'src/app/models/response.model';
import { createHeaders } from 'src/app/utils/headers';
import { userDataStoreName } from 'src/app/utils/sotre';
import { apiUrl } from 'src/app/utils/url';

@Injectable({
  providedIn: 'root',
})
export class CarService {
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
}
