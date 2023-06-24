import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, from, map, of } from 'rxjs';
import {
  register,
  registerFailed,
  updateDisplayName,
  updateDisplayNameSuccess,
} from '../auth.actions';
import { SignupErrorType } from '../signup-error';
import { FirebaseError } from '@angular/fire/app';
import * as auth from 'firebase/compat';

@Injectable()
export class RegisterEffects {
  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(register),
      exhaustMap(
        (action: { email: string; password: string; username: string }) =>
          from(
            this.firebaseAuth.createUserWithEmailAndPassword(
              action.email,
              action.password
            )
          ).pipe(
            map((userCredentials) => {
              return updateDisplayName({
                user: userCredentials,
                displayName: action.username,
              });
            }),
            catchError((err: FirebaseError) => {
              return this.handleRegisterErrors(err);
            })
          )
      )
    );
  });

  updateDisplayName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateDisplayName),
      exhaustMap(
        (action: {
          user: auth.default.auth.UserCredential;
          displayName: string;
        }) => {
          if (action.user.user) {
            return from(
              action.user.user?.updateProfile({
                displayName: action.displayName,
              })
            ).pipe(
              map(() => {
                return updateDisplayNameSuccess();
              })
            );
          }

          // TODO: handle this case
          return EMPTY;
        }
      )
    );
  });

  constructor(
    private actions$: Actions,
    private firebaseAuth: AngularFireAuth
  ) {}

  private handleRegisterErrors(err: FirebaseError) {
    switch (err.code) {
      case 'auth/email-already-in-use':
        return of(
          registerFailed({
            message: err.message,
            errorType: SignupErrorType.EMAIL_ALREADY_IN_USE,
          })
        );
      case 'auth/invalid-email':
        return of(
          registerFailed({
            message: err.message,
            errorType: SignupErrorType.INVALID_EMAIL,
          })
        );
      case 'auth/operation-not-allowed':
        return of(
          registerFailed({
            message: err.message,
            errorType: SignupErrorType.OPERATION_NOT_ALLOWED,
          })
        );
      case 'auth/weak-password':
        return of(
          registerFailed({
            message: err.message,
            errorType: SignupErrorType.WEAK_PASSWORD,
          })
        );
      default:
        return of(
          registerFailed({
            message: err.message,
            errorType: SignupErrorType.UNKNOWN,
          })
        );
    }
  }
}
