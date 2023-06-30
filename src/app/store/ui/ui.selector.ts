import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './ui.reducer';

export const uiSelector = createFeatureSelector<State>('ui');

export const selectIsLoading = createSelector(
  uiSelector,
  (state: State) => state.isLoading
);

export const selectMenu = createSelector(
  uiSelector,
  (state: State) => state.menu
);
