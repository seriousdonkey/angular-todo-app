import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthFacade } from '../../facade/auth.facade';
import { Subscription } from 'rxjs';
import { UiFacade } from '../../../facade/ui.facade';

import { CommonModule } from '@angular/common';

import { InputComponent } from '../../../components/input/input.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { CardComponent } from '../../../components/card/card.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    CardComponent,
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
