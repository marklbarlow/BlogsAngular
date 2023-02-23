import { users } from 'testing';

import { UserState } from '../reducers/users.reducer';
import {
  selectAvailableUsers,
  selectSelectedUser,
  selectUserState,
} from './users.selectors';

describe('Users Selectors', () => {
  describe('selectUserState', () => {
    it('returns the user state', () => {
      const userState = {} as UserState;
      const result = selectUserState({ users: userState });
      expect(result).toBe(userState);
    });
  });

  describe('selectAvailableUsers', () => {
    it('returns empty if state undefined', () => {
      const result = selectAvailableUsers.projector(undefined);
      expect(result).toEqual([]);
    });

    it('returns the available users', () => {
      const state = { availableUsers: users } as UserState;
      const result = selectAvailableUsers.projector(state);
      expect(result).toBe(users);
    });
  });

  describe('selectSelectedUser', () => {
    it('gets the selected user', () => {
      const state = { selectedUser: users[0] } as UserState;
      const result = selectSelectedUser.projector(state);
      expect(result).toBe(users[0]);
    });
  });
});
