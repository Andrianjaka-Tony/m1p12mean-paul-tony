import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Skill } from '../../models/mechanic/skill.model';
import { Response } from '../../models/response.model';
import { apiUrl } from '../../utils/url';
import { createHeaders } from '../../utils/headers';
import { pageSize } from '../../utils/page-size';
import { Pageable } from 'src/app/models/pageable.model';
import { Employee } from 'src/app/models/mechanic/employee.model';
import { User } from 'src/app/models/auth/user.model';

type EmployeePage = Pageable & {
  employes: Employee[];
};

type EmployeeById = {
  employe: Employee;
  all_skills: Skill[];
};

type UpdateSkillsBody = {
  id_employe: string;
  skills: string[];
};

export type EmployeeSave = {
  user: User;
  employe: {
    salary: number;
    skills?: string[];
  };
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

  findById(id: string) {
    const headers = createHeaders();
    return this.http.get<Response<EmployeeById>>(
      `${apiUrl}/api/employe/${id}`,
      {
        headers,
      }
    );
  }

  save(employee: EmployeeSave) {
    const headers = createHeaders();
    return this.http.post<Response<EmployeeSave>>(
      `${apiUrl}/auth/emp/register`,
      employee,
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
