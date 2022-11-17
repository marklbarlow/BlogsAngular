import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BlogLike } from 'app/model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss'],
})
export class LikesComponent {
  @Input() public likes: BlogLike[] = [];
}
