import { createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/pages/todo/models/category.model';
import { loadCategoriesSuccess } from './todo.actions';

export interface State {
  categories: Category[];
}

const initialState: State = {
  categories: [],
};

export const todoReducer = createReducer(
  initialState,
  on(loadCategoriesSuccess, (state, { categories: categories }): State => {
    return {
      ...state,
      categories: categories,
    };
  })
);
