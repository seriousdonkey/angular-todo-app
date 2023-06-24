import { createAction } from '@ngrx/store';

export const STOP_LOADING_ACTION = '[UI] Stop Loading';

export const startLoading = createAction('[UI] Start Loading');
export const stopLoading = createAction(STOP_LOADING_ACTION);
