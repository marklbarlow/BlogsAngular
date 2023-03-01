import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  OnDestroy$,
  takeUntilDestroyed,
} from '@pdtec/ngx-observable-lifecycle';
import { User } from 'app/model';
import { filter } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-nav-bar',
  styleUrls: ['./nav-bar.component.scss'],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent extends OnDestroy$ implements OnChanges, OnInit {
  @Input() public availableUsers: User[] = [];
  @Input() public currentlySelectedUser?: User;
  @Output() public readonly userSelected = new EventEmitter<User>();

  public selectedUser = new FormControl<User | undefined>(
    undefined,
    Validators.required
  );

  constructor() {
    super();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentlySelectedUser']) {
      this.selectedUser.setValue(changes['currentlySelectedUser'].currentValue);
    }
  }

  public ngOnInit(): void {
    this.selectedUser.valueChanges
      .pipe(takeUntilDestroyed(this), filter(Boolean))
      .subscribe(user => this.userSelected.emit(user));
  }

  public trackUsers(_: number, user: User): number {
    return user.id;
  }
}
