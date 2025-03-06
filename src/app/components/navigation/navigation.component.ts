import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'navigation',
  imports: [RouterLink],
  template: `
    <nav
      class="fixed z-10 top-0 left-0 w-screen py-6 px-8 flex justify-between items-center"
    >
      <div class="w-1/3 text-2xl">
        <a href="/" routerLink="/"> Vroom </a>
      </div>
      <div class="flex gap-8">
        <a href="/" routerLink="/">Accueil</a>
        <a href="/subscriptions" routerLink="/subscriptions">Abonnements</a>
        <a href="/faq" routerLink="/faq">FAQ</a>
      </div>
      <div class="w-1/3 flex justify-end items-center gap-8">
        <a href="/sign-up" routerLink="/sign-up">S'inscrire</a>
        <a href="/sign-in" routerLink="/sign-in">
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
