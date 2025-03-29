import { Component, inject, OnInit, signal } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { Service } from 'src/app/models/mechanic/services.model';
import { Pageable } from 'src/app/models/pageable.model';
import { ServicesService } from 'src/app/services/mechanic/services.service';
import { ServicesListComponent } from './services-list/services-list.component';
import { StatePaginationComponent } from '../../components/state-pagination/state-pagination.component';
import { Calendar, Check, LucideAngularModule, Receipt } from 'lucide-angular';
import { ButtonComponent } from 'src/app/components/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toast } from 'src/app/components/toast/toast.component';
import { NumberFormatPipe } from 'src/app/pipes/number-format.pipe';
import { NgClass } from '@angular/common';

export type ServiceQuantity = {
  [key: string]: number;
};

@Component({
  selector: 'new-quote',
  imports: [
    ServicesListComponent,
    StatePaginationComponent,
    LucideAngularModule,
    ButtonComponent,
    ReactiveFormsModule,
    NumberFormatPipe,
    NgClass,
  ],
  templateUrl: './new-quote.component.html',
  styles: ``,
})
export class NewQuotePage implements OnInit {
  readonly receipt = Receipt;
  readonly calendar = Calendar;
  readonly check = Check;

  readonly servicesService = inject(ServicesService);

  readonly isLoading = signal<boolean>(true);
  readonly page = signal<number>(1);
  readonly allServices = signal<Service[]>([] as Service[]);
  readonly services = signal<Service[]>([] as Service[]);
  readonly pageable = signal<Pageable>({} as Pageable);

  readonly quantities = signal<ServiceQuantity>({} as ServiceQuantity);
  readonly calculatedPrice = signal<number>(0);

  readonly isSubmitted = signal<boolean>(false);
  readonly isSending = signal<boolean>(false);
  readonly message = signal<string>('');
  readonly formGroup = new FormGroup({
    label: new FormControl('', [Validators.required]),
    created_at: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.findAllServices();
    this.findServices();
    this.calculatePrice();
  }

  findServices() {
    this.isLoading.set(true);
    this.servicesService
      .findServices(this.page() || 1)
      .pipe(
        catchError((e) => {
          throw e;
        }),
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe((response) => {
        this.services.set(response.data.services);
        this.pageable.set(response.data as Pageable);
      });
  }

  findAllServices() {
    this.isLoading.set(true);
    this.servicesService
      .findAllServices()
      .pipe(
        catchError((e) => {
          throw e;
        }),
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe((response) => {
        this.allServices.set(response.data.services);
      });
  }

  add(service: string) {
    const quantity: number | undefined = this.quantities()[service];
    if (!quantity) {
      this.quantities.set({ ...this.quantities(), [service]: 1 });
      this.calculatePrice();
      return;
    }

    this.quantities.set({ ...this.quantities(), [service]: quantity + 1 });
    this.calculatePrice();
  }

  remove(service: string) {
    const quantity: number | undefined = this.quantities()[service];

    if (!quantity) {
      return;
    }

    this.quantities.set({ ...this.quantities(), [service]: quantity - 1 });
    this.calculatePrice();
  }

  calculatePrice() {
    let total: number = 0;
    Object.keys(this.quantities()).forEach((key) => {
      const quantity = this.quantities()[key];
      if (quantity > 0) {
        const service = this.allServices().find(
          (service) => service._id === key
        );
        if (service) {
          total += service.price * quantity;
        }
      }
    });

    this.calculatedPrice.set(total);
  }

  async handleSubmit() {
    this.isSubmitted.set(true);
    if (this.formGroup.get('label')?.hasError('required')) {
      toast(
        'error',
        'Intitulé requis',
        'Veuillez entrer un intitulé pour le devis'
      );
      return;
    }
    if (this.formGroup.get('created_at')?.hasError('required')) {
      toast('error', 'Date requise', 'La date du devis est requise');
      return;
    }
    if (this.calculatedPrice() == 0) {
      toast(
        'error',
        'Aucun service sélectionné',
        'Veuillez ajouter au moins un service'
      );
      return;
    }
    this.isSending.set(true);
    // if (this.signinForm.valid) {
    //   this.isSending.set(true);

    //   const { value: user } = this.signinForm;
    //   this.signinService
    //     .signin(user as User)
    //     .pipe(
    //       catchError((e) => {
    //         const error = e.error as Response<undefined>;
    //         this.message.set(error.message);
    //         throw e;
    //       }),
    //       finalize(() => {
    //         this.isSending.set(false);
    //       })
    //     )
    //     .subscribe((response) => {
    //       this.signService.saveUserData(response.data, this.message);
    //       toast(
    //         'success',
    //         'Connexion réussie',
    //         `Vous êtes maintenant connecté en tant que ${response.data.user.firstname}`
    //       );

    //       this.signService.redirect(response.data);
    //     });
    // }
  }
}
