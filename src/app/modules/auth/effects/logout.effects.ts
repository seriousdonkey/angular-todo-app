import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map, catchError, of, mergeMap } from 'rxjs';
import { logout, logoutSuccess, addError } from '../auth.actions';

@Injectable()
export class LogoutEffects {
  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      mergeMap(() => {
        return from(this.firebaseAuth.signOut()).pipe(
          map(() => {
            return logoutSuccess();
          }),
          catchError(() => {
            return of(addError({ message: 'unknown logout error' }));
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private firebaseAuth: AngularFireAuth
  ) {}
}
