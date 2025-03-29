import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { QuoteAdd, QuoteFromFind } from 'src/app/models/clients/quote.model';
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

  findQuoteById(id: string) {
    const headers = createHeaders();

    return this.http.get<Response<QuoteFromFind>>(
      `${apiUrl}/api/devis/details/${id}`,
      { headers }
    );
  }
}
