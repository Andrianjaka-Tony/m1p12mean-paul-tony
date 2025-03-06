import { Component } from '@angular/core';

import { LucideAngularModule, Chrome } from 'lucide-angular';

@Component({
  selector: 'sign-in',
  imports: [LucideAngularModule],
  templateUrl: './sign-in.component.html',
})
export class SigninPage {
  readonly chrome = Chrome;
}
