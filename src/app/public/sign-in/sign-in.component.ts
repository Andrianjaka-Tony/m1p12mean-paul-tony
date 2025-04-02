import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { LucideAngularModule, Chrome } from 'lucide-angular';
import { SignInService } from '../../services/auth/sign-in.service';
import { User } from '../../models/auth/user.model';
import { catchError, finalize } from 'rxjs';
import { Response } from '../../models/response.model';
import { SignService } from '../../services/auth/sign.service';
import { toast } from '../../components/toast/toast.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sign-in',
  imports: [LucideAngularModule, ReactiveFormsModule, NgClass],
  templateUrl: './sign-in.component.html',
})
export class SigninPage implements OnInit {
  readonly signService = inject(SignService);
  readonly signinService = inject(SignInService);
  readonly route = inject(ActivatedRoute);

  readonly chrome = Chrome;

  readonly isSubmitted = signal<boolean>(false);
  readonly isSending = signal<boolean>(false);
  readonly message = signal<string>('');
  readonly signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const email = params['email'] || '';
      const password = params['password'] || '';

      this.signinForm.setValue({
        email,
        password,
      });
    });
  }

  async handleSubmit() {
    this.isSubmitted.set(true);
    if (this.signinForm.valid) {
      this.isSending.set(true);

      const { value: user } = this.signinForm;
      this.signinService
        .signin(user as User)
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
          this.signService.saveUserData(response.data, this.message);
          toast(
            'success',
            'Connexion réussie',
            `Vous êtes maintenant connecté en tant que ${response.data.user.firstname}`
          );

          this.signService.redirect(response.data);
        });
    }
  }
}
