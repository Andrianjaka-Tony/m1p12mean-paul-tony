import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Response } from '../../models/response.model';
import { apiUrl } from '../../utils/url';
import { createHeaders } from '../../utils/headers';
import { pageSize } from '../../utils/page-size';
import { Pageable } from 'src/app/models/pageable.model';
import { CarType } from 'src/app/models/clients/car-type.model';

type CarTypePage = Pageable & {
  types: CarType[];
};

@Injectable({
  providedIn: 'root',
})
export class CarTypeService {
  readonly http = inject(HttpClient);

  find(page: number) {
    const headers = createHeaders();
    return this.http.get<Response<CarTypePage>>(
      `${apiUrl}/api/type_vehicle?page=${page}&limit=${pageSize}`,
      {
        headers,
      }
    );
  }

  findAll() {
    const headers = createHeaders();
    return this.http.get<Response<CarTypePage>>(
      `${apiUrl}/api/type_vehicle?page=${1}&limit=${1000}`,
      {
        headers,
      }
    );
  }

  save(carType: CarType) {
    const headers = createHeaders();
    return this.http.post<Response<CarType>>(
      `${apiUrl}/api/type_vehicle`,
      carType,
      {
        headers,
      }
    );
  }
}
