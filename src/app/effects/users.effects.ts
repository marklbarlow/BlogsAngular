import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BlogsService } from 'app/services';
import { UserActions } from 'app/store';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';

@Injectable()
export class UsersEffects {
  public loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers.type),
      mergeMap(() =>
        this.service.loadUsers().pipe(
          map(
            users => UserActions.loadUsersSuccess({ users }),
            catchError(() => EMPTY)
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: BlogsService) {}
}
