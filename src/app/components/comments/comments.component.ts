import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BlogComment } from 'app/model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  @Input() public comments: BlogComment[] = [];
  @Output() public readonly commentAdded = new EventEmitter<string>();
  public comment = new FormControl<string>('', Validators.required);

  public onAddComment(text: string | null): void {
    if (text) {
      this.commentAdded.emit(text);
      this.comment.reset();
    }
  }

  public trackComments(_: number, comment: BlogComment): number {
    return comment.id;
  }
}
