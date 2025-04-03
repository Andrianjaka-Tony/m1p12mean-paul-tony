import { Component, inject, OnInit, signal } from '@angular/core';
import { ServiceDetail } from 'src/app/models/clients/quote.model';
import { QuoteService } from 'src/app/services/clients/quote.service';
import { BadgeComponent } from '../../components/badge/badge.component';
import { NumberFormatPipe } from 'src/app/pipes/number-format.pipe';
import { Check, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'overview-page',
  imports: [BadgeComponent, NumberFormatPipe, LucideAngularModule],
  templateUrl: './tasks.component.html',
  styles: ``,
})
export class TasksPage implements OnInit {
  readonly check = Check;

  readonly quoteService = inject(QuoteService);
  readonly tasks = signal<ServiceDetail[]>([]);

  ngOnInit(): void {
    this.findTasks();
  }

  findTasks() {
    this.quoteService.findAllTasks().subscribe((response) => {
      this.tasks.set(response.data);
    });
  }
}
