import { UserModel } from '../models/user.model';
import { createReducer, on } from '@ngrx/store';
import { addError, authStateChanged } from './auth.actions';

export enum AuthState {
  LOGGED_IN,
  LOGGED_OUT,
  NOT_SET,
}

export interface State {
  user: UserModel | null;
  authState: AuthState;
  errorMessage?: string;
}

const initialState: State = {
  user: null,
  authState: AuthState.NOT_SET,
};

export const authReducer = createReducer(
  initialState,
  on(
    authStateChanged,
    (state, { user }): State => ({
      ...state,
      authState: user !== null ? AuthState.LOGGED_IN : AuthState.LOGGED_OUT,
      user,
    })
  ),
  on(addError, (state, { message }): State => {
    console.log('addError:', message);
    return {
      ...state,
      errorMessage: message,
    };
  })
);
