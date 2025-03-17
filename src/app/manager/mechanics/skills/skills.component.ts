import { Component, inject, OnInit, signal } from '@angular/core';
import { SkillsListComponent } from './skills-list/skills-list.component';
import { Skill } from '../../../models/mechanic/skill.model';
import { SkillService } from '../../../services/mechanic/skill.service';
import { catchError, finalize } from 'rxjs';
import { Award, LucideAngularModule } from 'lucide-angular';
import { ButtonComponent } from '../../../components/button/button.component';
import { SkillSaveComponent } from './skill-save/skill-save.component';
import { PagePaginationComponent } from 'src/app/components/page-pagination/page-pagination.component';
import { Pageable } from 'src/app/models/pageable.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'skills',
  imports: [
    SkillsListComponent,
    LucideAngularModule,
    ButtonComponent,
    SkillSaveComponent,
    PagePaginationComponent,
  ],
  templateUrl: './skills.component.html',
  styles: ``,
})
export class SkillsPage implements OnInit {
  readonly route = inject(ActivatedRoute);
  page: number = 1;

  readonly award = Award;

  readonly skillService = inject(SkillService);

  readonly isSave = signal<boolean>(false);

  readonly isFindLoading = signal<boolean>(true);
  readonly skills = signal<Skill[]>([]);
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
    this.skillService
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
        this.skills.set(response.data.skills);
        this.pageable.set(response.data as Pageable);
      });
  }
}
