import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/pages/todo/models/category.model';

export const LOAD_CATEGORIES = '[Todo] Load Categories';

export const LOAD_CATEGORIES_SUCCESS = '[Todo] Load Categories Success';
export const LOAD_CATEGORIES_FAILED = '[Todo] Load Categories Failed';

export const loadCategoriesSuccess = createAction(
  LOAD_CATEGORIES_SUCCESS,
  props<{ categories: Category[] }>()
);
