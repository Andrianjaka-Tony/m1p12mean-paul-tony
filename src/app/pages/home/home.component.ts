import { Component, AfterViewInit, HostListener } from '@angular/core';
import Lenis from '@studio-freight/lenis';

import { HeroComponent } from '../../components/hero/hero.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { ServicesComponent } from '../../components/services/services.component';
import { ProcessComponent } from '../../components/process/process.component';
import { SubscriptionComponent } from '../../components/subscription/subscription.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [
    NavigationComponent,
    HeroComponent,
    ServicesComponent,
    ProcessComponent,
    SubscriptionComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomePage implements AfterViewInit {
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
  onScroll(event: Event): void {
    this.lenis.raf(performance.now());
  }
}
