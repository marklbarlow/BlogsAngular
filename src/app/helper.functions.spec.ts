import { likes, users } from 'testing';

import { includesUser } from './helper.functions';

describe('includesUser()', () => {
  it('returns false when user is undefined', () => {
    const result = includesUser(likes, undefined);
    expect(result).toBeFalse();
  });

  it('returns false when  likes list is empty', () => {
    const result = includesUser([], users[0]);
    expect(result).toBeFalse();
  });

  it('returns false when user not in likes list', () => {
    const result = includesUser(likes, users[3]);
    expect(result).toBeFalse();
  });

  it('returns true when user is in likes list', () => {
    const result = includesUser(likes, users[0]);
    expect(result).toBeTrue();
  });
});
