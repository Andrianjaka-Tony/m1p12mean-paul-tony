import { NgClass } from '@angular/common';
import { Component, input, output, WritableSignal } from '@angular/core';
import { ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';
import { Pageable } from 'src/app/models/pageable.model';

@Component({
  selector: 'state-pagination',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './state-pagination.component.html',
  styles: ``,
})
export class StatePaginationComponent {
  readonly chevronLeft = ChevronLeft;
  readonly chevronRight = ChevronRight;

  readonly pageSignal = input.required<WritableSignal<number>>();
  readonly pageable = input.required<Pageable>();

  readonly change = output();

  nextPage() {
    this.pageSignal().set(this.pageSignal()() + 1);
    this.change.emit();
  }

  previousPage() {
    this.pageSignal().set(this.pageSignal()() - 1);
    this.change.emit();
  }
}
