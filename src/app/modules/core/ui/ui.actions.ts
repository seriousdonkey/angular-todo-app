import { createAction, props } from '@ngrx/store';
import { SidebarMenu } from '../models/sidebar.model';

export const STOP_LOADING_ACTION = '[UI] Stop Loading';

export const startLoading = createAction('[UI] Start Loading');
export const stopLoading = createAction(STOP_LOADING_ACTION);

export const ADD_MENU_ITEM_ACTION = '[UI] Add Menu Item';
export const addMenuItemAction = createAction(
  ADD_MENU_ITEM_ACTION,
  props<{ menuItem: SidebarMenu }>()
);
