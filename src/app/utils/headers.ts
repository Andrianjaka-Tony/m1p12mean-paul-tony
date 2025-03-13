import { HttpHeaders } from '@angular/common/http';
import { userTokenStoreName } from './sotre';

export function createHeaders(): HttpHeaders {
  const token = localStorage.getItem(userTokenStoreName);
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return headers;
}
