import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Skill } from '../../models/mechanic/skill.model';
import { Response } from '../../models/response.model';
import { apiUrl } from '../../utils/url';
import { createHeaders } from '../../utils/headers';
import { pageSize } from '../../utils/page-size';
import { Pageable } from 'src/app/models/pageable.model';
import { Employee } from 'src/app/models/mechanic/employee.model';

type EmployeePage = Pageable & {
  employes: Employee[];
};

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  readonly http = inject(HttpClient);

  find(page: number) {
    const headers = createHeaders();
    return this.http.get<Response<EmployeePage>>(
      `${apiUrl}/api/employe?page=${page}&limit=${pageSize}`,
      {
        headers,
      }
    );
  }

  save(skill: Skill) {
    const headers = createHeaders();
    return this.http.post<Response<Skill>>(`${apiUrl}/api/skill`, skill, {
      headers,
    });
  }

  update(skill: Skill) {
    const headers = createHeaders();
    return this.http.put<Response<undefined>>(
      `${apiUrl}/api/skill/${skill._id}`,
      skill,
      {
        headers,
      }
    );
  }

  delete(id: string) {
    const headers = createHeaders();
    return this.http.delete<Response<undefined>>(`${apiUrl}/api/skill/${id}`, {
      headers,
    });
  }
}
