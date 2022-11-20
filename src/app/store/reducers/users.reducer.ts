import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'app/model';

import { UserActions } from '../actions';

export interface UserState {
  availableUsers: User[];
  selectedUser?: User;
}

export const initialState: UserState = {
  availableUsers: [],
};

const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, _ => initialState),
  on(
    UserActions.loadUsersFailure,
    (state, { error }): UserState => ({ ...state })
  ),
  on(
    UserActions.loadUsersSuccess,
    (state, { users }): UserState => ({
      ...state,
      availableUsers: users,
      selectedUser: users.length > 0 ? users[0] : undefined,
    })
  ),
  on(
    UserActions.selectUser,
    (state, { user }): UserState => ({
      ...state,
      selectedUser: user,
    })
  )
);

export function reducer(
  state: UserState | undefined,
  action: Action
): UserState {
  return userReducer(state, action);
}
