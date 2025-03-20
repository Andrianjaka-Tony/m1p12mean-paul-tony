import {
  Component,
  inject,
  OnInit,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { Award, LucideAngularModule, X } from 'lucide-angular';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { createForm } from 'src/app/utils/create-form';
import {
  ControlledInputComponent,
  SelectOption,
} from 'src/app/components/controlled-input/controlled-input.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CarType } from 'src/app/models/clients/car-type.model';
import { Brand } from 'src/app/models/clients/brand.model';
import { CarTypeService } from 'src/app/services/clients/car-type.service';
import { BrandService } from 'src/app/services/clients/brand.service';
import { CarService } from 'src/app/services/clients/car.service';
import { CarFromForm } from 'src/app/models/clients/car.model';
import { catchError, finalize } from 'rxjs';
import { Response } from 'src/app/models/response.model';
import { toast } from 'src/app/components/toast/toast.component';

@Component({
  selector: 'car-save',
  imports: [
    ModalComponent,
    ButtonComponent,
    LucideAngularModule,
    ReactiveFormsModule,
    NgClass,
    ControlledInputComponent,
  ],
  templateUrl: './car-save.component.html',
  styles: ``,
})
export class CarSaveComponent implements OnInit {
  readonly carTypeService = inject(CarTypeService);
  readonly brandService = inject(BrandService);
  readonly carService = inject(CarService);

  readonly cross = X;
  readonly award = Award;

  readonly carTypes = signal<CarType[]>([]);
  readonly brands = signal<Brand[]>([]);

  readonly close = output();
  readonly afterSubmit = output();

  readonly fields = [
    {
      name: 'id_type_vehicle',
      defaultValue: '',
      validators: [Validators.required],
    },
    {
      name: 'id_brand_vehicle',
      defaultValue: '',
      validators: [Validators.required],
    },
    {
      name: 'model',
      defaultValue: '',
      validators: [Validators.required],
    },
    {
      name: 'registration_number',
      defaultValue: '',
      validators: [Validators.required],
    },
    { name: 'year', defaultValue: '', validators: [Validators.required] },
  ];
  readonly form = createForm(this.fields);
  readonly fieldsControls = [
    {
      id: 'id_type_vehicle',
      label: 'Type de véhicule',
      type: 'select',
      controleName: 'id_type_vehicle',
      isSubmitted: this.form.isSubmitted,
      form: this.form.formGroup,
      messages: [
        {
          message: 'Le type de véhicule est requis.',
          validator: 'required',
        },
      ],
      placeholder: 'Choisir un type de véhicule',
    },
    {
      id: 'id_brand_vehicle',
      label: 'Marque',
      type: 'select',
      controleName: 'id_brand_vehicle',
      isSubmitted: this.form.isSubmitted,
      form: this.form.formGroup,
      messages: [
        {
          message: 'La marque est requise.',
          validator: 'required',
        },
      ],
      placeholder: 'Choisir une marque',
    },
    {
      id: 'model',
      label: 'Modèle',
      type: 'text',
      controleName: 'model',
      isSubmitted: this.form.isSubmitted,
      form: this.form.formGroup,
      messages: [{ message: 'Le modèle est requis.', validator: 'required' }],
      class: 'w-3/5',
    },
    {
      id: 'registration_number',
      label: 'Immatriculation',
      type: 'text',
      controleName: 'registration_number',
      isSubmitted: this.form.isSubmitted,
      form: this.form.formGroup,
      messages: [
        { message: "L'immatriculation est requise.", validator: 'required' },
      ],
    },
    {
      id: 'year',
      label: 'Année',
      type: 'number',
      controleName: 'year',
      isSubmitted: this.form.isSubmitted,
      form: this.form.formGroup,
      messages: [{ message: "L'année est requise.", validator: 'required' }],
      class: 'w-2/5',
    },
  ];
  readonly options = [
    this.carTypes as WritableSignal<SelectOption[]>,
    this.brands as WritableSignal<SelectOption[]>,
  ];
  readonly typeAndBrand = this.fieldsControls.filter(
    (element) =>
      element.id === 'id_type_vehicle' || element.id === 'id_brand_vehicle'
  );
  readonly modelAndYear = this.fieldsControls.filter(
    (element) => element.id === 'model' || element.id === 'year'
  );
  readonly others = this.fieldsControls.filter(
    (element) => element.id === 'registration_number'
  );

  ngOnInit(): void {
    this.carTypeService.findAll().subscribe((response) => {
      this.carTypes.set(response.data.types as SelectOption[]);
    });
    this.brandService.findAll().subscribe((response) => {
      this.brands.set(response.data.brands as SelectOption[]);
    });
  }

  handleClose() {
    this.close.emit();
  }

  handleSubmit() {
    this.form.isSubmitted.set(true);
    if (this.form.formGroup.valid) {
      this.form.isSending.set(true);
      const car = this.form.formGroup.value as CarFromForm;
      console.log(car);
      this.carService
        .save(car)
        .pipe(
          catchError((e) => {
            const error = e.error as Response<undefined>;
            this.form.message.set(error.message);
            throw e;
          }),
          finalize(() => {
            this.form.isSending.set(false);
          })
        )
        .subscribe(() => {
          toast(
            'success',
            'Véhicule enregistré',
            `Le véhicule a bien été sauvegardé`
          );
          this.handleClose();
          this.afterSubmit.emit();
        });
    }
  }
}
