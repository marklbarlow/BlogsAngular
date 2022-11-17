import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { BlogComment, BlogEntry, BlogLike } from 'app/model';
import { BlogsService } from 'app/services';
import { Observable, switchMap } from 'rxjs';

interface BlogState {
  comments: BlogComment[];
  entry?: BlogEntry;
  likes: BlogLike[];
}

@Injectable()
export class BlogStore extends ComponentStore<BlogState> {
  public readonly comments$ = this.select(x => x.comments);
  public readonly entry$ = this.select(x => x.entry);
  public readonly likes$ = this.select(x => x.likes);

  public loadComments = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      switchMap(_ =>
        this.service.loadBlogComments(1).pipe(
          tapResponse(
            comments => this.patchState({ comments }),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  );

  public loadEntry = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      switchMap(_ =>
        this.service.loadBlogEntry(1).pipe(
          tapResponse(
            entry => this.patchState({ entry }),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  );
  public loadLikes = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      switchMap(_ =>
        this.service.loadBlogLikes(1).pipe(
          tapResponse(
            likes => this.patchState({ likes }),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  );

  constructor(private service: BlogsService) {
    super({ comments: [], likes: [] });
  }

  public initialise(): void {
    this.loadComments();
    this.loadEntry();
    this.loadLikes();
  }
}
