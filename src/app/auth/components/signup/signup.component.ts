import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthFacade } from '../../facade/auth.facade';
import { Subscription } from 'rxjs';

import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../components/input/input.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { CardComponent } from '../../../components/card/card.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    CardComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  errorMessage?: string;

  signUpForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    passwordVerify: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  private errorMessageSubscription?: Subscription;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.errorMessageSubscription = this.authFacade.errorMessage$.subscribe(
      (errMessage) => (this.errorMessage = errMessage)
    );
  }

  signUp() {
    const username = this.signUpForm.value.username;
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    const passwordVerify = this.signUpForm.value.passwordVerify;

    if (
      username &&
      email &&
      password &&
      passwordVerify &&
      password === passwordVerify
    ) {
      this.authFacade.register(email, password, username);
    }
  }

  ngOnDestroy(): void {
    this.errorMessageSubscription?.unsubscribe();
  }
}
