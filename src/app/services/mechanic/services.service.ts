import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Response } from '../../models/response.model';
import { apiUrl } from '../../utils/url';
import { createHeaders } from '../../utils/headers';
import { pageSize } from '../../utils/page-size';
import { Pageable } from 'src/app/models/pageable.model';
import {
  Service,
  ServiceCategory,
} from 'src/app/models/mechanic/services.model';

type ServiceCategoryPage = Pageable & {
  categories: ServiceCategory[];
};

type ServicePage = Pageable & {
  services: Service[];
};

type UpdateSkillsBody = {
  id_employe: string;
  skills: string[];
};

export type ServiceFromForm = {
  label: string;
  description: string;
  category: string;
  price: number;
  default_duration: number;
  required_skills: string[];
};

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  readonly http = inject(HttpClient);

  findServiceCategories(page: number) {
    const headers = createHeaders();
    return this.http.get<Response<ServiceCategoryPage>>(
      `${apiUrl}/api/service_categories?page=${page}&limit=${pageSize}`,
      {
        headers,
      }
    );
  }

  findAllCategories() {
    const headers = createHeaders();
    return this.http.get<Response<ServiceCategoryPage>>(
      `${apiUrl}/api/service_categories?page=${1}&limit=${100}`,
      {
        headers,
      }
    );
  }

  findServices(page: number) {
    const headers = createHeaders();
    return this.http.get<Response<ServicePage>>(
      `${apiUrl}/api/service?page=${page}&limit=${pageSize}`,
      {
        headers,
      }
    );
  }

  saveServiceCategory(category: ServiceCategory) {
    const headers = createHeaders();
    return this.http.post<Response<undefined>>(
      `${apiUrl}/api/service_categories`,
      category,
      { headers }
    );
  }

  saveService(service: ServiceFromForm) {
    service.price = parseFloat(service.price.toString());
    service.default_duration = parseFloat(service.default_duration.toString());
    service.required_skills = [];

    const headers = createHeaders();
    return this.http.post<Response<undefined>>(
      `${apiUrl}/api/service`,
      service,
      { headers }
    );
  }

  updateSkills(newSkills: UpdateSkillsBody) {
    const headers = createHeaders();
    return this.http.put<Response<undefined>>(
      `${apiUrl}/api/employe/skills`,
      newSkills,
      { headers }
    );
  }

  // update(skill: Skill) {
  //   const headers = createHeaders();
  //   return this.http.put<Response<undefined>>(
  //     `${apiUrl}/api/skill/${skill._id}`,
  //     skill,
  //     {
  //       headers,
  //     }
  //   );
  // }

  // delete(id: string) {
  //   const headers = createHeaders();
  //   return this.http.delete<Response<undefined>>(`${apiUrl}/api/skill/${id}`, {
  //     headers,
  //   });
  // }
}
