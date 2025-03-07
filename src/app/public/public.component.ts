import { Component, AfterViewInit } from '@angular/core';
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
  ngAfterViewInit(): void {
    const lenis = new Lenis({ duration: 2 });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
}
