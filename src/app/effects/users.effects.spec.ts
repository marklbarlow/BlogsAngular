import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BlogsService } from 'app/services';
import { UserActions } from 'app/store';
import { Observable, of, throwError } from 'rxjs';
import { expectAction, expectNoAction, users } from 'testing';

import { UsersEffects } from './users.effects';

describe('UsersEffects', () => {
  let actions$: Observable<Action>;
  const actionSetter = (x: Observable<Action>) => (actions$ = x);
  let effects: UsersEffects;

  let service: jasmine.SpyObj<BlogsService>;
  let store: MockStore;

  beforeEach(() => {
    service = jasmine.createSpyObj('service', ['loadUsers']);

    TestBed.configureTestingModule({
      providers: [
        UsersEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: BlogsService, useValue: service },
      ],
    });

    effects = TestBed.inject(UsersEffects);
    store = TestBed.inject(Store) as MockStore;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadUsers$', () => {
    it('retrieves the users', () => {
      service.loadUsers.and.returnValue(of(users));

      expectAction(
        effects.loadUsers$,
        UserActions.loadUsers(),
        UserActions.loadUsersSuccess({ users }),
        actionSetter
      );
    });

    it('returns nothing on error', () => {
      service.loadUsers.and.returnValue(throwError(() => new Error()));

      expectNoAction(effects.loadUsers$, UserActions.loadUsers(), actionSetter);
    });
  });
});
