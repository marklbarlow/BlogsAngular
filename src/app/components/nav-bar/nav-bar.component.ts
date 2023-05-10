import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'app/model';
import { filter } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-nav-bar',
  styleUrls: ['./nav-bar.component.scss'],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent implements OnChanges {
  @Input() public availableUsers: User[] = [];
  @Input() public currentlySelectedUser?: User;
  @Output() public readonly userSelected = new EventEmitter<User>();

  public selectedUser = new FormControl<User | undefined>(
    undefined,
    Validators.required
  );

  constructor() {
    this.selectedUser.valueChanges
      .pipe(takeUntilDestroyed(), filter(Boolean))
      .subscribe(user => this.userSelected.emit(user));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentlySelectedUser']) {
      this.selectedUser.setValue(changes['currentlySelectedUser'].currentValue);
    }
  }

  public navigate(path: string): void {
    window.location.href = path;
  }

  public trackUsers(_: number, user: User): number {
    return user.id;
  }
}
