import { createSelector } from '@ngrx/store';

import { State } from '../reducers';

const selectUserState = (state: State) => state.users;

export const selectAvailableUsers = createSelector(
  selectUserState,
  state => state?.availableUsers ?? []
);

export const selectSelectedUser = createSelector(
  selectUserState,
  state => state?.selectedUser
);
