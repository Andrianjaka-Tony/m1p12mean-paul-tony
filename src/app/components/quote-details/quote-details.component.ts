import { Component, input } from '@angular/core';
import {
  QuoteFromFind,
  ServiceDetail,
} from 'src/app/models/clients/quote.model';
import { FormatDatePipe } from 'src/app/pipes/date-format.pipe';
import { NumberFormatPipe } from 'src/app/pipes/number-format.pipe';
import { QuoteStatusComponent } from '../quote-status/quote-status.component';

@Component({
  selector: 'quote-service',
  imports: [NumberFormatPipe],
  template: `
    <div
      class="font-light relative p-4 text-sm bg-[#111] border border-[#333] rounded-lg cursor-pointer duration-200 hover:border-[#555]"
    >
      <div class="flex items-center gap-3">
        <div class="w-12 aspect-square rounded-full bg-[#222]">
          <img
            class="h-full w-full rounded-full object-cover"
            src="https://res.cloudinary.com/dxvb6pnu2/image/upload/f_auto/q_auto/iqkwjjymzoetwf6saemo?_a=BAMCkGTG0"
          />
        </div>
        <div class="flex flex-col">
          <p class="text-lg">John Doe</p>
          <p class="opacity-70">{{ 'angolaina@gmail.com' }}</p>
        </div>
      </div>
      <div class="w-full mt-4 flex justify-between">
        <div class="flex flex-col">
          <p class="text-lg">{{ detail().service.label }}</p>
          <p class="text-sm opacity-70">
            {{ detail().service.category.label }} - Environ
            {{ detail().service.default_duration * detail().quantity }} heures
          </p>
        </div>
        <div class="flex flex-col items-end">
          <p class="text-lg">
            {{ detail().service.price * detail().quantity | numberFormat }} $
          </p>
          <p class="text-sm opacity-70">
            Quantité : {{ detail().quantity }} - Prix unitaire :
            {{ detail().service.price }} $
          </p>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class QuoteServiceComponent {
  readonly detail = input.required<ServiceDetail>();
}

@Component({
  selector: 'quote-details',
  imports: [
    QuoteServiceComponent,
    FormatDatePipe,
    NumberFormatPipe,
    QuoteStatusComponent,
  ],
  templateUrl: './quote-details.component.html',
  styles: ``,
})
export class QuoteDetailsComponent {
  readonly quote = input.required<QuoteFromFind>();
}
