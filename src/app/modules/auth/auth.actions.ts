import { createAction, props } from '@ngrx/store';
import { UserModel } from '../core/models/user.model';
import { LoginErrorType } from './login-error';
import { SignupErrorType } from './signup-error';
import * as firebase from 'firebase/compat';

export const AUTH_STATE_CHANGED_ACTION = '[Auth] Auth State Changed';
export const authStateChanged = createAction(
  AUTH_STATE_CHANGED_ACTION,
  props<{ user: UserModel | null }>()
);

export const LOGIN_ACTION = '[Auth] Login';
export const LOGIN_SUCCESS_ACTION = '[Auth] Login Success';
export const LOGIN_FAILED_ACTION = '[Auth] Login Failed';
export const login = createAction(
  LOGIN_ACTION,
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(LOGIN_SUCCESS_ACTION);
export const loginFailed = createAction(
  LOGIN_FAILED_ACTION,
  props<{ message: string; errorType: LoginErrorType }>()
);

export const REGISTER_ACTION = '[Auth] Register';
export const REGISTER_FAILED_ACTION = '[Auth] Register Failed';
export const register = createAction(
  REGISTER_ACTION,
  props<{ email: string; password: string; username: string }>()
);
export const registerFailed = createAction(
  REGISTER_FAILED_ACTION,
  props<{ message: string; errorType: SignupErrorType }>()
);

export const UPDATE_DISPLAYNAME_ACTION = '[Auth] Update DisplayName';
export const UPDATE_DISPLAYNAME_SUCCESS_ACTION =
  '[Auth] Update DisplayName Success';
export const updateDisplayName = createAction(
  UPDATE_DISPLAYNAME_ACTION,
  props<{ user: firebase.default.auth.UserCredential; displayName: string }>()
);
export const updateDisplayNameSuccess = createAction(
  UPDATE_DISPLAYNAME_SUCCESS_ACTION
);

export const LOGOUT_ACTION = '[Auth] Logout';
export const LOGOUT_SUCCESS_ACTION = '[Auth] Logout Success';
export const logout = createAction(LOGOUT_ACTION);
export const logoutSuccess = createAction(LOGOUT_SUCCESS_ACTION);

export const ADD_ERROR_ACTION = '[Auth] Add Error';
export const addError = createAction(
  ADD_ERROR_ACTION,
  props<{ message: string }>()
);
