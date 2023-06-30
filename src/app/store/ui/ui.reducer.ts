import { createReducer, on } from '@ngrx/store';
import {
  addMenuItemAction as addMenuAction,
  startLoading,
  stopLoading,
} from './ui.actions';
import { SidebarMenu } from '../../models/sidebar.model';

export interface State {
  isLoading: boolean;
  menu: SidebarMenu[];
}

const initialState: State = {
  isLoading: false,
  menu: [],
};

export const uiReducer = createReducer(
  initialState,
  on(
    startLoading,
    (state): State => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    stopLoading,
    (state): State => ({
      ...state,
      isLoading: false,
    })
  ),
  on(addMenuAction, (state, { menu: menuItem }): State => {
    if (state.menu.findIndex((m) => m.title === menuItem.title) > 0) {
      return state;
    }

    return {
      ...state,
      menu: [...state.menu, menuItem],
    };
  })
);

export const getIsLoading = (state: State) => state.isLoading;
