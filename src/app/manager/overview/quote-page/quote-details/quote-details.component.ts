import { Component, inject, input, signal } from '@angular/core';
import { BadgeComponent } from 'src/app/components/badge/badge.component';
import { QuoteStatusComponent } from 'src/app/components/quote-status/quote-status.component';
import {
  QuoteFromFind,
  ServiceDetail,
} from 'src/app/models/clients/quote.model';
import { FormatDatePipe } from 'src/app/pipes/date-format.pipe';
import { NumberFormatPipe } from 'src/app/pipes/number-format.pipe';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { Employee } from 'src/app/models/mechanic/employee.model';
import { QuoteService } from 'src/app/services/clients/quote.service';
import { catchError } from 'rxjs';
import { toast } from 'src/app/components/toast/toast.component';

@Component({
  selector: 'quote-service',
  imports: [NumberFormatPipe, BadgeComponent, ModalComponent],
  template: `
    <div
      class="font-light relative p-4 text-sm bg-[#111] border border-[#333] rounded-lg cursor-pointer duration-200 hover:border-[#555]"
      (click)="openModal()"
    >
      <!-- <div class="flex items-center gap-3 mb-4">
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
      </div> -->
      <div class="w-full flex justify-between">
        <div class="flex flex-col">
          <div class="text-lg flex items-end gap-4">
            <span>{{ detail().service.label }}</span>
            <div class="-translate-y-1">
              @if (detail().status === "pending") {
              <badge color="gray" text="En attente" />
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

    @if (isUpdating()) {
    <modal (close)="this.toggleModal()">
      <div class="p-5 pt-4">
        <div class="text-xl">Choisir un mécanicien</div>
        <div class="text-sm opacity-70 mt-1">
          Veuillez vhoisir un mécanicien pour accomplir la tache
        </div>
        <div class="w-lg mt-6 max-h-[300px] overflow-scroll">
          @for( employee of employees(); track $index) {
          <div
            class="flex items-center gap-3 p-3 bg-[#111] duration-200 hover:bg-[#222] rounded-lg cursor-pointer"
            (click)="update(employee._id || '')"
          >
            <div class="w-10 aspect-square rounded-full bg-[#222]">
              <img
                class="h-full w-full rounded-full object-cover"
                src="{{ employee.id_user.picture }}"
              />
            </div>
            <div class="flex flex-col">
              <p class="text-sm">
                {{ employee.id_user.lastname }} {{ employee.id_user.firstname }}
              </p>
              <p class="opacity-70 text-sm">{{ employee.id_user.email }}</p>
            </div>
          </div>
          }
        </div>
      </div>
    </modal>
    }
  `,
  styles: ``,
})
export class QuoteServiceComponent {
  readonly quoteService = inject(QuoteService);

  readonly detail = input.required<ServiceDetail>();
  readonly worker = signal<Employee>({} as Employee);
  readonly employees = signal<Employee[]>([]);

  readonly isUpdating = signal<boolean>(false);

  openModal() {
    this.isUpdating.set(true);
    if (this.employees().length === 0) {
      this.quoteService
        .findAllEmployeCompatiblesWithATask(this.detail()._id)
        .subscribe((response) => {
          this.employees.set(response.data);
        });
    }
  }

  toggleModal() {
    this.isUpdating.set(!this.isUpdating());
  }

  update(employeeId: string) {
    this.quoteService
      .assignTask(this.detail()._id, employeeId)
      .pipe(
        catchError((error) => {
          toast(
            'error',
            'Assignation échouée',
            "L'assignation n'a pas pu être effectuée"
          );
          throw error;
        })
      )
      .subscribe(() => {
        toast(
          'success',
          'Assignation réussie',
          "L'assignation a bien été effectuée"
        );
        this.toggleModal();
      });
  }
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
