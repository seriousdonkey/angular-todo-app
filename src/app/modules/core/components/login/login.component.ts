import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthFacade } from '../../auth/facade/auth.facade';
import { Subscription } from 'rxjs';
import { UiFacade } from '../../ui/facade/ui.facade';

import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MessageModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage?: string;

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  private errorMessageSubscription?: Subscription;

  constructor(private authFacade: AuthFacade, private uiFacade: UiFacade) {}

  ngOnInit(): void {
    this.errorMessageSubscription = this.authFacade.errorMessage$.subscribe(
      (errMessage) => (this.errorMessage = errMessage)
    );
  }

  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (email && password) {
      this.uiFacade.startLoading();
      this.authFacade.login(email, password);
      this.loginForm.controls['password'].reset();
    }
  }

  ngOnDestroy(): void {
    this.errorMessageSubscription?.unsubscribe();
  }
}
