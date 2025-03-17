import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/mechanic/employee.model';
import { EmployeeService } from 'src/app/services/mechanic/employee.service';
import { AvatarComponent } from '../../../../components/avatar/avatar.component';
import { SkeletonComponent } from '../../../../components/skeleton/skeleton.component';
import { Skill } from 'src/app/models/mechanic/skill.model';
import {
  TableBodyComponent,
  TableCellComponent,
  TableComponent,
  TableHeadComponent,
  TableHeaderComponent,
  TableRowComponent,
} from 'src/app/components/table/table.component';
import { SwitchComponent } from '../../../../components/switch/switch.component';
import { SkillService } from 'src/app/services/mechanic/skill.service';
import { Pageable } from 'src/app/models/pageable.model';
import { catchError, finalize } from 'rxjs';
import { StatePaginationComponent } from '../../../../components/state-pagination/state-pagination.component';

@Component({
  selector: 'employee-profile',
  imports: [
    AvatarComponent,
    SkeletonComponent,
    TableComponent,
    TableHeaderComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableRowComponent,
    TableCellComponent,
    SwitchComponent,
    StatePaginationComponent,
    SkeletonComponent,
  ],
  templateUrl: './employee-profile.component.html',
  styles: ``,
})
export class EmployeeProfilePage implements OnInit {
  readonly employeeService = inject(EmployeeService);
  readonly skillService = inject(SkillService);
  readonly route = inject(ActivatedRoute);
  id: string = '';

  readonly isLoading = signal<boolean>(true);
  readonly employee = signal<Employee>({} as Employee);
  readonly employeeSkillsId = signal<string[]>([]);

  readonly skillPage = signal<number>(1);
  readonly skillPageable = signal<Pageable>({} as Pageable);
  readonly skills = signal<Skill[]>([]);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id != null) {
        this.id = id;
        this.employeeService.findById(this.id).subscribe((response) => {
          this.employee.set(response.data.employe);
          this.employeeSkillsId.set(
            this.employee().skills.map((s) => s._id || '')
          );
          this.findSkills();
          this.isLoading.set(false);
        });
      }
    });
  }

  findSkills() {
    this.skills.set([]);
    this.skillService
      .find(this.skillPage() || 1)
      .pipe(
        catchError((e) => {
          throw e;
        }),
        finalize(() => {
          // this.isFindLoading.set(false);
        })
      )
      .subscribe((response) => {
        this.skills.set(response.data.skills);
        this.skillPageable.set(response.data as Pageable);
      });
  }

  checkedSwitch(skill: Skill) {
    console.log(this.employeeSkillsId().includes(skill._id || ''));
    return this.employeeSkillsId().includes(skill._id || '');
  }
}
