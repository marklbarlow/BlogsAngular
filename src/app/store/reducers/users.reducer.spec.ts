import { User } from 'app/model';
import { users } from 'testing';

import { UserActions } from '../actions';
import { initialState, reducer } from './users.reducer';

describe('Users Reducer', () => {
  describe(UserActions.loadUsers.type, () => {
    it('resets to the initial state', () => {
      const result = reducer(undefined, UserActions.loadUsers());
      expect(result).toBe(initialState);
    });
  });

  describe(UserActions.loadUsersSuccess.type, () => {
    it('sets the available users and selects the first user', () => {
      const result = reducer(
        undefined,
        UserActions.loadUsersSuccess({ users })
      );
      expect(result.availableUsers).toBe(users);
      expect(result.selectedUser).toBe(users[0]);
    });

    it('set the available users and set selected to undefined if no users', () => {
      const emptyUsers: User[] = [];
      const result = reducer(
        undefined,
        UserActions.loadUsersSuccess({ users: emptyUsers })
      );
      expect(result.availableUsers).toBe(emptyUsers);
      expect(result.selectedUser).toBeUndefined();
    });
  });

  describe(UserActions.selectUser.type, () => {
    it('sets the selected user', () => {
      const result = reducer(
        undefined,
        UserActions.selectUser({ user: users[0] })
      );
      expect(result.selectedUser).toBe(users[0]);
    });
  });
});
