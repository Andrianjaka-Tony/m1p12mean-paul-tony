import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="h-screen w-screen flex items-center justify-center">
      <h1 class="text-8xl tracking-tighter">Vroom Vroom🥳</h1>
    </div>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {}
