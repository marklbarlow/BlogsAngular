import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { User } from './model';
import { selectAvailableUsers, selectSelectedUser, UserActions } from './store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public availableUsers$ = this.store.pipe(select(selectAvailableUsers));
  public selectedUser$ = this.store.pipe(select(selectSelectedUser));

  constructor(private store: Store) {
    this.store.dispatch(UserActions.loadUsers());
  }

  public onUserSelected(user: User): void {
    this.store.dispatch(UserActions.selectUser({ user }));
  }
}
