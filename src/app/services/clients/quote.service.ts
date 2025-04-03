import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  QuoteAdd,
  QuoteFromFind,
  ServiceDetail,
} from 'src/app/models/clients/quote.model';
import { Employee } from 'src/app/models/mechanic/employee.model';
import { Response } from 'src/app/models/response.model';
import { createHeaders } from 'src/app/utils/headers';
import { userDataStoreName } from 'src/app/utils/sotre';
import { apiUrl } from 'src/app/utils/url';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  readonly http = inject(HttpClient);

  prepareSaveQuote(quote: QuoteAdd) {
    const user = JSON.parse(
      localStorage.getItem(userDataStoreName) || '{}'
    ) as { _id: string };

    quote.id_client = user._id;
  }

  saveuote(quote: QuoteAdd) {
    const headers = createHeaders();
    this.prepareSaveQuote(quote);

    return this.http.post<Response<undefined>>(`${apiUrl}/api/devis/`, quote, {
      headers,
    });
  }

  findAllByVehicle(vehicle: string) {
    const headers = createHeaders();

    return this.http.get<Response<QuoteFromFind[]>>(
      `${apiUrl}/api/devis/client/vehicle/${vehicle}`,
      { headers }
    );
  }

  findAllByClient() {
    const headers = createHeaders();

    return this.http.get<Response<{ devis: QuoteFromFind[] }>>(
      `${apiUrl}/api/devis/client?page=1&limit=1000`,
      { headers }
    );
  }

  findQuoteById(id: string) {
    const headers = createHeaders();

    return this.http.get<Response<{ devis: QuoteFromFind }>>(
      `${apiUrl}/api/devis/details/${id}`,
      { headers }
    );
  }

  findQuotesJustCreated() {
    const headers = createHeaders();

    return this.http.get<Response<{ devis: QuoteFromFind[] }>>(
      `${apiUrl}/api/devis/created?page=1&size=1000`,
      { headers }
    );
  }

  findQuotesAccepted() {
    const headers = createHeaders();

    return this.http.get<Response<{ devis: QuoteFromFind[] }>>(
      `${apiUrl}/api/devis/accept?page=1&size=1000`,
      { headers }
    );
  }

  acceptQuote(quote: QuoteFromFind) {
    const headers = createHeaders();

    return this.http.put<Response<undefined>>(
      `${apiUrl}/api/devis/on/confirm`,
      {
        id_devis: quote._id,
        begin_at: new Date(
          Math.max(
            new Date(quote.created_at).getTime() + 4 * 60 * 60 * 1000,
            new Date().getTime() + 4 * 60 * 60 * 1000
          )
        ),
      },
      { headers }
    );
  }

  findAllEmployeCompatiblesWithATask(taskId: string) {
    const headers = createHeaders();

    return this.http.get<Response<Employee[]>>(
      `${apiUrl}/api/services_details_in_devis/task/service/${taskId}/mechanic`,
      { headers }
    );
  }

  assignTask(taskId: string, employeeId: string) {
    const headers = createHeaders();

    return this.http.put<Response<undefined>>(
      `${apiUrl}/api/devis/service/assign`,
      {
        id_service_details: taskId,
        workers: [employeeId],
      },
      { headers }
    );
  }

  findNonStartedTasks() {
    const header = createHeaders();

    return this.http.get<Response<ServiceDetail[]>>(
      `${apiUrl}/api/services_details_in_devis/tasks/not-started`,
      { headers: header }
    );
  }

  findStartedTasks() {
    const header = createHeaders();

    return this.http.get<Response<ServiceDetail[]>>(
      `${apiUrl}/api/services_details_in_devis/tasks/started`,
      { headers: header }
    );
  }
}
