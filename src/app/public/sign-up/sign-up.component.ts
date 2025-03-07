import { Component } from '@angular/core';

import { LucideAngularModule, Chrome } from 'lucide-angular';

@Component({
  selector: 'sign-up',
  imports: [LucideAngularModule],
  templateUrl: './sign-up.component.html',
  styles: ``,
})
export class SignupPage {
  readonly chrome = Chrome;
}
