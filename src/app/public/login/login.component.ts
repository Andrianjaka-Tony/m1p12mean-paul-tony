import { Component } from '@angular/core';

import { LucideAngularModule, Chrome } from 'lucide-angular';

@Component({
  selector: 'login',
  imports: [LucideAngularModule],
  templateUrl: './login.component.html',
})
export class LoginPage {
  readonly chrome = Chrome;
}
