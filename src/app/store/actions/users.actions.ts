import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from 'app/model';

export const { loadUsers, loadUsersFailure, loadUsersSuccess, selectUser } =
  createActionGroup({
    events: {
      'Load Users': emptyProps(),
      'Load Users Failure': props<{ error: Error }>(),
      'Load Users Success': props<{ users: User[] }>(),
      'Select User': props<{ user: User }>(),
    },
    source: 'Users',
  });
