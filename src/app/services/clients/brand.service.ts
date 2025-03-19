import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Response } from '../../models/response.model';
import { apiUrl } from '../../utils/url';
import { createHeaders } from '../../utils/headers';
import { pageSize } from '../../utils/page-size';
import { Pageable } from 'src/app/models/pageable.model';
import { Brand } from 'src/app/models/clients/brand.model';

type BrandPage = Pageable & {
  brands: Brand[];
};

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  readonly http = inject(HttpClient);

  find(page: number) {
    const headers = createHeaders();
    return this.http.get<Response<BrandPage>>(
      `${apiUrl}/api/brand_vehicle?page=${page}&limit=${pageSize}`,
      {
        headers,
      }
    );
  }

  save(brand: Brand) {
    const headers = createHeaders();
    return this.http.post<Response<Brand>>(
      `${apiUrl}/api/brand_vehicle`,
      brand,
      {
        headers,
      }
    );
  }
}
