import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Skill } from '../../models/mechanic/skill.model';
import { Response } from '../../models/response.model';
import { apiUrl } from '../../utils/url';
import { userTokenStoreName } from '../../utils/sotre';

type FindAllResponse = Response<Skill[]>;

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  readonly http = inject(HttpClient);

  findAll() {
    const token = localStorage.getItem(userTokenStoreName);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<FindAllResponse>(`${apiUrl}/api/skill`, { headers });
  }
}
