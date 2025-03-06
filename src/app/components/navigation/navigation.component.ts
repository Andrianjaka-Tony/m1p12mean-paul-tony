import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'navigation',
  imports: [RouterLink],
  template: `
    <nav
      class="fixed z-10 top-0 left-0 w-screen py-6 px-8 flex justify-between items-center"
    >
      <a href="/" routerLink="/" class="w-1/3 text-2xl">Vroom</a>
      <div class="flex gap-8">
        <span>Accueil</span>
        <span>Abonnements</span>
        <span>FAQ</span>
      </div>
      <div class="w-1/3 flex justify-end">
        <a href="/login" routerLink="/login">
          <button class="bg-white px-6 py-2 rounded text-black cursor-pointer">
            Se connecter
          </button>
        </a>
      </div>
    </nav>
  `,
  styles: ``,
})
export class NavigationComponent {}
