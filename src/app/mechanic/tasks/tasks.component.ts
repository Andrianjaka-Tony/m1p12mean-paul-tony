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
