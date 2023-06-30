import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './todo.reducer';

export const todoSelector = createFeatureSelector<State>('todo');

export const selectCategories = createSelector(
  todoSelector,
  (state: State) => state.categories
);
