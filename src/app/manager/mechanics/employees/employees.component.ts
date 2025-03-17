import { Component, inject, OnInit, signal } from '@angular/core';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { catchError, finalize } from 'rxjs';
import { Award, LucideAngularModule } from 'lucide-angular';
import { ButtonComponent } from '../../../components/button/button.component';
import { SkillSaveComponent } from './employee-save/employee-save.component';
import { PagePaginationComponent } from 'src/app/components/page-pagination/page-pagination.component';
import { Pageable } from 'src/app/models/pageable.model';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/mechanic/employee.service';
import { Employee } from 'src/app/models/mechanic/employee.model';

@Component({
  selector: 'employees',
  imports: [
    EmployeesListComponent,
    LucideAngularModule,
    ButtonComponent,
    SkillSaveComponent,
    PagePaginationComponent,
  ],
  templateUrl: './employees.component.html',
  styles: ``,
})
export class EmployeesPage implements OnInit {
  readonly route = inject(ActivatedRoute);
  page: number = 1;

  readonly award = Award;

  readonly employeeService = inject(EmployeeService);

  readonly isSave = signal<boolean>(false);

  readonly isFindLoading = signal<boolean>(true);
  readonly employees = signal<Employee[]>([]);
  readonly pageable = signal<Pageable>({} as Pageable);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const page = params.get('page');
      if (page != null) {
        this.page = parseInt(page);
        this.isFindLoading.set(true);
        this.findAll();
      }
    });
  }

  toggleSave() {
    this.isSave.set(!this.isSave());
  }

  findAll() {
    this.employeeService
      .find(this.page || 1)
      .pipe(
        catchError((e) => {
          throw e;
        }),
        finalize(() => {
          this.isFindLoading.set(false);
        })
      )
      .subscribe((response) => {
        this.employees.set(response.data.employes);
        this.pageable.set(response.data as Pageable);
      });
  }
}
