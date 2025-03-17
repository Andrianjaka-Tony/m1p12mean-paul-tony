import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';
import { Pageable } from 'src/app/models/pageable.model';

@Component({
  selector: 'page-pagination',
  imports: [LucideAngularModule, RouterLink, NgClass],
  templateUrl: './page-pagination.component.html',
  styles: ``,
})
export class PagePaginationComponent {
  readonly chevronLeft = ChevronLeft;
  readonly chevronRight = ChevronRight;

  readonly prefix = input.required<string>();
  readonly pageable = input.required<Pageable>();
  readonly currentPage = input<number>(1);
}
