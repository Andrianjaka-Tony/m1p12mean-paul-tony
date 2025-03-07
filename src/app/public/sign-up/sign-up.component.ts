import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { LucideAngularModule, Chrome } from 'lucide-angular';
import { SignUpService } from '../../services/sign-up.service';
import { User } from '../../models/auth/user.model';
import { NgClass } from '@angular/common';
import { userDataStoreName, userTokenStoreName } from '../../utils/sotre';
import { catchError, finalize } from 'rxjs';
import { Response } from '../../models/response.model';

@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [LucideAngularModule, ReactiveFormsModule, NgClass],
  templateUrl: './sign-up.component.html',
  styles: ``,
})
export class SignupPage {
  readonly signupService = inject(SignUpService);

  readonly chrome = Chrome;

  readonly isSubmitted = signal<boolean>(false);
  readonly isSending = signal<boolean>(false);
  readonly message = signal<string>('');
  readonly signupForm = new FormGroup({
    lastname: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  async handleSubmit() {
    this.isSubmitted.set(true);
    if (this.signupForm.valid) {
      this.isSending.set(true);

      const { value: user } = this.signupForm;
      this.signupService
        .signupHttp(user as User)
        .pipe(
          catchError((e) => {
            const error = e.error as Response<undefined>;
            this.message.set(error.message);
            throw e;
          }),
          finalize(() => {
            this.isSending.set(false);
          })
        )
        .subscribe((response) => {
          const { data } = response;
          localStorage.setItem(userDataStoreName, JSON.stringify(data.user));
          localStorage.setItem(userTokenStoreName, JSON.stringify(data.token));

          // Redirection please
        });
    }
  }
}
