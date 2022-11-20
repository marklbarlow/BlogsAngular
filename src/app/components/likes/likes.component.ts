import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { includesUser } from 'app/helper.functions';
import { BlogLike, User } from 'app/model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss'],
})
export class LikesComponent {
  @Input() public likes: BlogLike[] = [];
  @Input() public currentUser?: User;
  @Output() public readonly likeToggled = new EventEmitter();

  public getFontSet(): string {
    return includesUser(this.likes, this.currentUser)
      ? 'material-icons'
      : 'material-icons-outlined';
  }

  public getTooltip(): string {
    return `Liked by ${this.likes.map(x => x.username).join(', ')}`;
  }

  public onLikeToggled(): void {
    this.likeToggled.emit();
  }
}
