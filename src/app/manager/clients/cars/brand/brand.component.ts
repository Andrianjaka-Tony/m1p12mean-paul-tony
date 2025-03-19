import { Component, inject, OnInit, signal } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { BriefcaseBusiness, LucideAngularModule, Wrench } from 'lucide-angular';
import { Pageable } from 'src/app/models/pageable.model';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { StatePaginationComponent } from 'src/app/components/state-pagination/state-pagination.component';
import { Brand } from 'src/app/models/clients/brand.model';
import { BrandService } from 'src/app/services/clients/brand.service';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandSaveComponent } from './brand-save/brand-save.component';

@Component({
  selector: 'brand-section',
  imports: [
    LucideAngularModule,
    ButtonComponent,
    StatePaginationComponent,
    BrandListComponent,
    BrandSaveComponent,
  ],
  templateUrl: './brand.component.html',
  styles: ``,
})
export class BrandSection implements OnInit {
  readonly wrench = Wrench;
  readonly briefCase = BriefcaseBusiness;

  readonly brandService = inject(BrandService);

  readonly isSave = signal<boolean>(false);

  readonly isFindLoading = signal<boolean>(true);
  readonly page = signal<number>(1);
  readonly brands = signal<Brand[]>([]);
  readonly pageable = signal<Pageable>({} as Pageable);

  ngOnInit(): void {
    this.findAll();
  }

  toggleSave() {
    this.isSave.set(!this.isSave());
  }

  findAll() {
    this.isFindLoading.set(true);
    this.brandService
      .find(this.page() || 1)
      .pipe(
        catchError((e) => {
          throw e;
        }),
        finalize(() => {
          this.isFindLoading.set(false);
        })
      )
      .subscribe((response) => {
        this.brands.set(response.data.brands);
        this.pageable.set(response.data as Pageable);
      });
  }
}
