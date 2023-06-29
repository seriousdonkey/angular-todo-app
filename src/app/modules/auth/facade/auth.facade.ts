import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { login, logout, register } from '../auth.actions';
import { Observable } from 'rxjs';
import {
  selectAuthState,
  selectErrorMessage,
  selectIsAuth,
  selectUser,
} from '../auth.selector';
import { AuthState } from '../auth.reducer';
import { UserModel } from '../../core/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  public get authState$(): Observable<AuthState> {
    return this.store.select(selectAuthState);
  }

  public get isAuth$(): Observable<boolean> {
    return this.store.select(selectIsAuth);
  }

  public get user$(): Observable<UserModel | null> {
    return this.store.select(selectUser);
  }

  public get errorMessage$(): Observable<string | undefined> {
    return this.store.select(selectErrorMessage);
  }

  constructor(private store: Store) {}

  login(email: string, password: string) {
    this.store.dispatch(login({ email, password }));
  }

  register(email: string, password: string, username: string) {
    this.store.dispatch(register({ email, password, username }));
  }

  logout() {
    this.store.dispatch(logout());
  }
}
