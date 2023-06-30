import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromAuth from './auth/auth.reducer';
import * as fromUi from './ui/store/ui.reducer';

export interface State {
  auth: fromAuth.State;
  ui: fromUi.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  ui: fromUi.uiReducer,
};

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getUiIsLoading = createSelector(getUiState, fromUi.getIsLoading);
