import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  OnDestroy$,
  takeUntilDestroyed,
} from '@pdtec/ngx-observable-lifecycle';
import { filter } from 'rxjs';

import { User } from './model';
import { selectAvailableUsers, selectSelectedUser, UserActions } from './store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends OnDestroy$ implements OnInit {
  public availableUsers$ = this.store.pipe(select(selectAvailableUsers));
  public selectedUser$ = this.store.pipe(select(selectSelectedUser));
  public selectedUser = new FormControl<User | undefined>(
    undefined,
    Validators.required
  );

  constructor(private store: Store) {
    super();
    this.store.dispatch(UserActions.loadUsers());
  }

  public ngOnInit(): void {
    this.selectedUser$
      .pipe(takeUntilDestroyed(this))
      .subscribe(user => this.selectedUser.setValue(user));

    this.selectedUser.valueChanges
      .pipe(takeUntilDestroyed(this), filter(Boolean))
      .subscribe(user => this.store.dispatch(UserActions.selectUser({ user })));
  }

  public trackUsers(_: number, user: User): number {
    return user.id;
  }
}
