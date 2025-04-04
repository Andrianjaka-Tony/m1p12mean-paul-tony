import { Component, input } from '@angular/core';
import {
  QuoteFromFind,
  ServiceDetail,
} from 'src/app/models/clients/quote.model';
import { FormatDatePipe } from 'src/app/pipes/date-format.pipe';
import { NumberFormatPipe } from 'src/app/pipes/number-format.pipe';
import { QuoteStatusComponent } from '../quote-status/quote-status.component';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'quote-service',
  imports: [NumberFormatPipe, BadgeComponent],
  template: `
    <div
      class="font-light relative p-4 text-sm bg-[#111] border border-[#333] rounded-lg cursor-pointer duration-200 hover:border-[#555]"
    >
      @for(worker of detail().workers; track $index) {
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 aspect-square rounded-full bg-[#222]">
          <img
            class="h-full w-full rounded-full object-cover"
            src="{{ worker.id_user.picture }}"
          />
        </div>
        <div class="flex flex-col">
          <p class="text-lg">
            {{ worker.id_user.lastname }} {{ worker.id_user.firstname }}
          </p>
          <p class="opacity-70">{{ worker.id_user.email }}</p>
        </div>
      </div>
      }
      <div class="w-full flex justify-between">
        <div class="flex flex-col">
          <div class="text-lg flex items-end gap-4">
            <span>{{ detail().service.label }}</span>
            <div class="-translate-y-1">
              @if (detail().status === "pending") {
              <badge color="gray" text="En attente" />
              } @if (detail().status === "in_progress") {
              <badge color="blue" text="En cours" />
              } @if (detail().status === "completed") {
              <badge color="green" text="Terminé" />
              }
            </div>
          </div>
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
