import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';

@Component({
  selector: 'app-home',
  imports: [NavigationComponent, HeroComponent],
  templateUrl: './home.component.html',
})
export class HomePage {}
