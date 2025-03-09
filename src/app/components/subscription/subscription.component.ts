import { AfterViewInit, Component, input } from '@angular/core';
import gsap from 'gsap';

import { splitRows } from '../../utils/split-rows';
import { observe } from '../../utils/observe';

@Component({
  selector: 'subscription',
  imports: [],
  templateUrl: './subscription.component.html',
  styles: ``,
})
export class SubscriptionComponent implements AfterViewInit {
  readonly delay = input<number>(0.2);

  animateTitle() {
    gsap.to('.subscription-title-line', {
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      delay: this.delay(),
    });
  }

  initTitle() {
    let title = document.querySelector('#subscription-title') as HTMLElement;
    if (title) {
      const lines = splitRows(title, 'text-5xl');
      title.innerHTML = '';
      lines.forEach((line) => {
        title.innerHTML += `
          <div class="overflow-hidden">
            <p style="transform: translateY(100%)" class="subscription-title-line">${line}</p>
          </div>
        `;
      });

      observe(title, () => this.animateTitle());
    }
  }

  animateSubscriptions() {
    gsap.to('#subscriptions > div', {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      delay: this.delay() + 0.2,
      stagger: 0.1,
    });
  }

  initSubscriptions() {
    let subscriptions = document.querySelector('#subscriptions') as HTMLElement;
    if (subscriptions) {
      Array.from(subscriptions.children)
        .map((child) => child as HTMLElement)
        .forEach((child) => {
          child.style.transform = 'translateY(50px)';
          child.style.opacity = '0';
        });
      observe(subscriptions, () => this.animateSubscriptions());
    }
  }

  ngAfterViewInit(): void {
    this.initTitle();
    this.initSubscriptions();
  }
}
