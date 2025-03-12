import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manager',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: ``,
})
export class ManagerRoute {}
