import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import * as fromUsers from './users.reducer';

export interface State {
  router?: RouterReducerState;
  users?: fromUsers.UserState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  users: fromUsers.reducer,
};

export const routerFeatureKey = 'router';
