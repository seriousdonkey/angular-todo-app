import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { authStateChanged } from '../auth.actions';
import { concatMap, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserModel } from '../../core/models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  authState$ = createEffect(() => {
    return this.firebaseAuth.authState.pipe(
      concatMap((val) => {
        if (val) {
          const user: UserModel = {
            userId: val.uid,
            email: val.email,
            displayName: val.displayName,
          };
          this.router.navigate(['todo']);
          return of(authStateChanged({ user }));
        } else {
          this.router.navigate(['login']);
          return of(authStateChanged({ user: null }));
        }
      })
    );
  });

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {}
}
