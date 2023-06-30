import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromAuth from './auth/auth.reducer';
import * as fromUi from './store/ui/ui.reducer';
import * as fromTodo from './store/todo/todo.reducer';

export interface State {
  auth: fromAuth.State;
  ui: fromUi.State;
  todo: fromTodo.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  ui: fromUi.uiReducer,
  todo: fromTodo.todoReducer,
};

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getUiIsLoading = createSelector(getUiState, fromUi.getIsLoading);
