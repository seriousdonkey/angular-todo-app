import { createReducer, on } from '@ngrx/store';
import { startLoading, stopLoading } from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
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
  )
);

export const getIsLoading = (state: State) => state.isLoading;
