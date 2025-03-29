import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  readonly http = inject(HttpClient);

  addQuote() {}
}
