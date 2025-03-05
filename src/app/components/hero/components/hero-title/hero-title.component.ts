import { Component } from '@angular/core';

@Component({
  selector: 'hero-title',
  imports: [],
  template: `
    <div class="mt-[20vh]">
      <h1 id="hero-title" class="text-8xl leading-[0.95]">
        Simplifiez l'entretien de votre voiture
      </h1>
      <div class="mt-8 overflow-hidden">
        <div id="hero-buttons" class="flex gap-4">
          <button class="bg-white px-6 py-2 rounded text-black cursor-pointer">
            Se connecter
          </button>
          <button class="px-6 py-2 rounded cursor-pointer bg-[#22222285]">
            A propos
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class HeroTitleComponent {}
