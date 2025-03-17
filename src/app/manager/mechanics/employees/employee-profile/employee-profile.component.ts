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
  ],
  templateUrl: './employee-profile.component.html',
  styles: ``,
})
export class EmployeeProfilePage implements OnInit {
  readonly employeeService = inject(EmployeeService);
  readonly route = inject(ActivatedRoute);
  id: string = '';

  readonly isLoading = signal<boolean>(true);
  readonly employee = signal<Employee>({} as Employee);
  readonly skills = signal<Skill[]>([]);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id != null) {
        this.id = id;
        this.employeeService.findById(this.id).subscribe((response) => {
          this.employee.set(response.data.employe);
          this.skills.set(response.data.all_skills);
          this.isLoading.set(false);
        });
      }
    });
  }
}
