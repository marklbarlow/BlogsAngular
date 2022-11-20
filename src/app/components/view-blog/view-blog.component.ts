import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BlogStore } from './blog.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BlogStore],
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss'],
})
export class ViewBlogComponent implements OnInit {
  public comments$ = this.store.comments$;
  public currentUser$ = this.store.currentUser$;
  public entry$ = this.store.entry$;
  public likes$ = this.store.likes$;

  constructor(private store: BlogStore) {}

  public ngOnInit(): void {
    this.store.initialise();
  }

  public onCommentAdded(text: string): void {
    this.store.addComment(text);
  }

  public onLikeToggled(): void {
    this.store.toggleLiked();
  }
}
