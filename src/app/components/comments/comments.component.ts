import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BlogComment } from 'app/model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  @Input() public comments: BlogComment[] = [];
}
