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
import { Award, LucideAngularModule } from 'lucide-angular';
import { ButtonComponent } from '../../../../components/button/button.component';
import { NgClass } from '@angular/common';
import { toast } from 'src/app/components/toast/toast.component';

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
    LucideAngularModule,
    ButtonComponent,
    NgClass,
  ],
  templateUrl: './employee-profile.component.html',
  styles: ``,
})
export class EmployeeProfilePage implements OnInit {
  readonly award = Award;

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
  readonly isCommitable = signal<boolean>(false);

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
        })
      )
      .subscribe((response) => {
        this.skills.set(response.data.skills);
        this.skillPageable.set(response.data as Pageable);
      });
  }

  checkedSwitch(skill: Skill) {
    return this.employeeSkillsId().includes(skill._id || '');
  }

  toggleSkill(checked: boolean, skill: Skill) {
    this.isCommitable.set(true);
    if (checked) {
      this.employeeSkillsId.set([...this.employeeSkillsId(), skill._id || '']);
      return;
    }
    this.employeeSkillsId.set(
      this.employeeSkillsId().filter((s) => s !== skill._id)
    );
  }

  doUpdate() {
    this.isCommitable.set(false);
    this.employeeService
      .updateSkills({
        id_employe: this.employee()._id || '',
        skills: this.employeeSkillsId(),
      })
      .pipe(
        catchError((e) => {
          toast(
            'error',
            'Modification échouée',
            'Une erreur est survenue lors de la modification'
          );
          throw e;
        })
      )
      .subscribe((response) => {
        toast(
          'success',
          'Modification réussie',
          'Les compétences du mécaniciens ont été  mises à jour'
        );
      });
  }
}
