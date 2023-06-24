import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './auth.reducer';

export const authSelector = createFeatureSelector<State>('auth');

export const selectAuthState = createSelector(
  authSelector,
  (state: State) => state.authState
);

export const selectIsAuth = createSelector(
  authSelector,
  (state: State) => state.user !== null
);

export const selectUser = createSelector(
  authSelector,
  (state: State) => state.user
);

export const selectErrorMessage = createSelector(
  authSelector,
  (state: State) => state.errorMessage
);
