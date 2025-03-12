import { Component, inject, OnInit, signal } from '@angular/core';
import { SkillsListComponent } from './skills-list/skills-list.component';
import { Skill } from '../../../models/mechanic/skill.model';
import { SkillService } from '../../../services/mechanic/skill.service';
import { catchError, finalize } from 'rxjs';
import { Award, LucideAngularModule } from 'lucide-angular';
import { ButtonComponent } from '../../../components/button/button.component';
import { SkillSaveComponent } from './skill-save/skill-save.component';

@Component({
  selector: 'skills',
  imports: [
    SkillsListComponent,
    LucideAngularModule,
    ButtonComponent,
    SkillSaveComponent,
  ],
  templateUrl: './skills.component.html',
  styles: ``,
})
export class SkillsPage implements OnInit {
  readonly award = Award;

  readonly skillService = inject(SkillService);

  readonly isSave = signal<boolean>(false);

  readonly isFindLoading = signal<boolean>(true);
  readonly skills = signal<Skill[]>([]);

  ngOnInit(): void {
    this.findAll();
  }

  toggleSave() {
    this.isSave.set(!this.isSave());
  }

  findAll() {
    this.skillService
      .findAll()
      .pipe(
        catchError((e) => {
          throw e;
        }),
        finalize(() => {
          this.isFindLoading.set(false);
        })
      )
      .subscribe((response) => {
        this.skills.set(response.data);
      });
  }
}
