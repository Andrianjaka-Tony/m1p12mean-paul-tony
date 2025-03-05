import { Component } from '@angular/core';

@Component({
  selector: 'navigation',
  imports: [],
  template: `
    <nav
      class="fixed z-10 top-0 left-0 w-screen py-6 px-8 flex justify-between items-center"
    >
      <p class="w-1/3 text-2xl">Vroom</p>
      <div class="flex gap-8">
        <span>Accueil</span>
        <span>Abonnements</span>
        <span>FAQ</span>
      </div>
      <div class="w-1/3 flex justify-end">
        <button class="bg-white px-6 py-2 rounded text-black cursor-pointer">
          Se connecter
        </button>
      </div>
    </nav>
  `,
  styles: ``,
})
export class NavigationComponent {}
