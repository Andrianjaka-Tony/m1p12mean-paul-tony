import { AfterViewInit, Component } from '@angular/core';
import gsap from 'gsap';

import { HeroTitleComponent } from './components/hero-title/hero-title.component';
import { HeroDescriptiionComponent } from './components/hero-descriptiion/hero-descriptiion.component';
import { HeroTagsComponent } from './components/hero-tags/hero-tags.component';
import { splitRows } from '../../utils/split-rows';

@Component({
  selector: 'hero',
  imports: [HeroTitleComponent, HeroDescriptiionComponent, HeroTagsComponent],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements AfterViewInit {
  initDescription() {
    let text = document.querySelector('#hero-description') as HTMLElement;
    if (text) {
      const lines = splitRows(text, 'text-xl font-light');
      text.innerHTML = '';
      lines.forEach((line) => {
        text.innerHTML += `
          <div class="overflow-hidden">
            <p class="hero-description-line">${line}</p>
          </div>
        `;
      });
    }
  }

  animaeTags() {
    gsap.fromTo(
      '#hero-tags-wrapper div p',
      { y: '150%' },
      { y: 0, duration: 1, stagger: 0.05, ease: 'power3.out', delay: 0.5 }
    );
  }

  animeTitleAndDescription() {
    gsap.fromTo(
      '#hero-title',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
    gsap.fromTo(
      '#hero-buttons, .hero-description-line',
      { y: '150%' },
      { y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.7 }
    );
  }

  ngAfterViewInit(): void {
    this.animaeTags();
    this.initDescription();
    this.animeTitleAndDescription();
  }
}
