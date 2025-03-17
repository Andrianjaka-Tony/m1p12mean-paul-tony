import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Skill } from '../../models/mechanic/skill.model';
import { Response } from '../../models/response.model';
import { apiUrl } from '../../utils/url';
import { createHeaders } from '../../utils/headers';
import { pageSize } from '../../utils/page-size';
import { Pageable } from 'src/app/models/pageable.model';

type SkillPage = Pageable & {
  skills: Skill[];
};

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  readonly http = inject(HttpClient);

  find(page: number) {
    const headers = createHeaders();
    return this.http.get<Response<SkillPage>>(
      `${apiUrl}/api/skill?page=${page}&limit=${pageSize}`,
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
