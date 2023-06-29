import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addError, login, loginFailed, loginSuccess } from '../auth.actions';
import { catchError, from, map, mergeMap, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginErrorType } from '../login-error';
import { stopLoading } from '../../core/ui/ui.actions';
import { FirebaseError } from '@angular/fire/app';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      mergeMap((action: { email: string; password: string }) =>
        from(
          this.firebaseAuth.signInWithEmailAndPassword(
            action.email,
            action.password
          )
        ).pipe(
          map(() => {
            return loginSuccess();
          }),
          catchError((err: FirebaseError) => {
            return this.handleLoginErrors(err);
          })
        )
      )
    );
  });

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      map(() => stopLoading())
    );
  });

  loginFailedAddError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginFailed),
      map((err) => {
        // TODO: map to domain specified error messages
        return addError({ message: err.message });
      })
    );
  });

  loginFailedStopLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginFailed),
      map(() => stopLoading())
    );
  });

  constructor(
    private actions$: Actions,
    private firebaseAuth: AngularFireAuth
  ) {}

  private handleLoginErrors(err: FirebaseError) {
    switch (err.code) {
      case 'auth/invalid-email':
        return of(
          loginFailed({
            message: err.message,
            errorType: LoginErrorType.INVALID_EMAIL,
          })
        );
      case 'auth/user-disabled':
        return of(
          loginFailed({
            message: err.message,
            errorType: LoginErrorType.USER_DISABLED,
          })
        );
      case 'auth/user-not-found':
        return of(
          loginFailed({
            message: err.message,
            errorType: LoginErrorType.USER_NOT_FOUND,
          })
        );
      case 'auth/wrong-password':
        return of(
          loginFailed({
            message: err.message,
            errorType: LoginErrorType.WRONG_PASSWORD,
          })
        );
      default:
        return of(
          loginFailed({
            message: err.message,
            errorType: LoginErrorType.UNKNOWN,
          })
        );
    }
  }
}
