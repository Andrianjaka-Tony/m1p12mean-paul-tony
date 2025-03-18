import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Skill } from 'src/app/models/mechanic/skill.model';
import {
  TableBodyComponent,
  TableCellComponent,
  TableComponent,
  TableHeadComponent,
  TableHeaderComponent,
  TableRowComponent,
} from 'src/app/components/table/table.component';
import { SkillService } from 'src/app/services/mechanic/skill.service';
import { Pageable } from 'src/app/models/pageable.model';
import { catchError } from 'rxjs';
import { Award, LucideAngularModule } from 'lucide-angular';
import { NgClass } from '@angular/common';
import { ServicesService } from 'src/app/services/mechanic/services.service';
import { Service } from 'src/app/models/mechanic/services.model';
import { SkeletonComponent } from 'src/app/components/skeleton/skeleton.component';
import { SwitchComponent } from 'src/app/components/switch/switch.component';
import { StatePaginationComponent } from 'src/app/components/state-pagination/state-pagination.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { toast } from 'src/app/components/toast/toast.component';

@Component({
  selector: 'service-details',
  imports: [
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
  templateUrl: './service-details.component.html',
  styles: ``,
})
export class ServiceDetailsPage implements OnInit {
  readonly award = Award;

  readonly servicesService = inject(ServicesService);
  readonly skillService = inject(SkillService);
  readonly route = inject(ActivatedRoute);
  id: string = '';

  readonly isLoading = signal<boolean>(true);
  readonly service = signal<Service>({} as Service);
  readonly serviceRequiredSkillsId = signal<string[]>([]);

  readonly skillPage = signal<number>(1);
  readonly skillPageable = signal<Pageable>({} as Pageable);
  readonly skills = signal<Skill[]>([]);
  readonly isCommitable = signal<boolean>(false);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id != null) {
        this.id = id;
        this.servicesService.findServiceById(this.id).subscribe((response) => {
          this.service.set(response.data);
          this.serviceRequiredSkillsId.set(
            this.service().required_skills.map((s) => s._id || '')
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
    return this.serviceRequiredSkillsId().includes(skill._id || '');
  }

  toggleSkill(checked: boolean, skill: Skill) {
    this.isCommitable.set(true);
    if (checked) {
      this.serviceRequiredSkillsId.set([
        ...this.serviceRequiredSkillsId(),
        skill._id || '',
      ]);
      return;
    }
    this.serviceRequiredSkillsId.set(
      this.serviceRequiredSkillsId().filter((s) => s !== skill._id)
    );
  }

  doUpdate() {
    this.isCommitable.set(false);
    this.servicesService
      .updateServiceRequiredSkills(this.service()._id || '', {
        skills: this.serviceRequiredSkillsId(),
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
          'Les compétences requises ont été mises à jour'
        );
      });
  }
}
