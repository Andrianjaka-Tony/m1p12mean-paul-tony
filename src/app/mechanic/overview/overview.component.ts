import { Component, inject, OnInit, signal } from '@angular/core';
import { ServiceDetail } from 'src/app/models/clients/quote.model';
import { QuoteService } from 'src/app/services/clients/quote.service';
import { BadgeComponent } from '../../components/badge/badge.component';
import { NumberFormatPipe } from 'src/app/pipes/number-format.pipe';
import { ButtonComponent } from '../../components/button/button.component';
import { Check, LucideAngularModule } from 'lucide-angular';
import { toast } from 'src/app/components/toast/toast.component';

@Component({
  selector: 'overview-page',
  imports: [
    BadgeComponent,
    NumberFormatPipe,
    ButtonComponent,
    LucideAngularModule,
  ],
  templateUrl: './overview.component.html',
  styles: ``,
})
export class OverviewPage implements OnInit {
  readonly check = Check;

  readonly quoteService = inject(QuoteService);
  readonly tasksStarted = signal<ServiceDetail[]>([]);
  readonly tasksNotStarted = signal<ServiceDetail[]>([]);

  ngOnInit(): void {
    this.findStartedTasks();
    this.findNonStartedTasks();
  }

  findStartedTasks() {
    this.quoteService.findStartedTasks().subscribe((response) => {
      this.tasksStarted.set(response.data);
    });
  }

  findNonStartedTasks() {
    this.quoteService.findNonStartedTasks().subscribe((response) => {
      this.tasksNotStarted.set(response.data);
    });
  }

  startTask(task: ServiceDetail) {
    this.quoteService.startTask(task._id).subscribe((response) => {
      toast('success', 'Tâche démarrée', 'La tâche a bien été démarrée');
      this.tasksStarted.set([...this.tasksStarted(), task]);
      this.tasksNotStarted.set(
        this.tasksNotStarted().filter((t) => t._id !== task._id)
      );
    });
  }
}
