import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
  router?: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
};

export const routerFeatureKey = 'router';

export * from './router.selectors';
