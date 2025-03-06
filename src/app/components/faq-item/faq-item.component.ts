import { Component, input, signal } from '@angular/core';
import gsap from 'gsap';

import { Question } from '../../public/faq/faq.component';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'faq-item',
  imports: [LucideAngularModule],
  templateUrl: './faq-item.component.html',
  styles: ``,
})
export class FaqItemComponent {
  readonly plus = Plus;

  readonly isShowed = signal<boolean>(false);

  readonly question = input.required<Question>();
  readonly index = input.required<number>();

  toggleShowed() {
    this.isShowed.set(!this.isShowed());
    const target = document.querySelector(`#faq-${this.index()}`);
    if (target) {
      const height = target.querySelector('p')?.getBoundingClientRect().height;
      if (this.isShowed()) {
        gsap.to(`#faq-${this.index()}`, {
          height: height ? height + 24 : 0,
          duration: 0.1,
          ease: 'power2.out',
        });
      } else {
        gsap.to(`#faq-${this.index()}`, {
          height: 0,
          duration: 0.1,
          ease: 'power2.out',
        });
      }
    }
  }
}
