import { Component, AfterViewInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import Lenis from '@studio-freight/lenis';
import { NavigationComponent } from '../components/navigation/navigation.component';

@Component({
  selector: 'login',
  imports: [RouterOutlet, NavigationComponent],
  template: `
    <navigation />
    <router-outlet />
  `,
})
export class PublicRoute implements AfterViewInit {
  private lenis!: Lenis;

  ngAfterViewInit(): void {
    this.lenis = new Lenis({
      lerp: 0.1,
      duration: 2,
    });

    const raf = (time: number) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }

  @HostListener('wheel', ['$event'])
  onScroll(): void {
    this.lenis.raf(performance.now());
  }
}
