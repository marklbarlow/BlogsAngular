import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { includesUser } from 'app/helper.functions';
import { BlogComment, BlogEntry, BlogLike } from 'app/model';
import { BlogsService } from 'app/services';
import { selectRouteParam, selectSelectedUser } from 'app/store';
import { EMPTY, filter, map, mergeMap, Observable, switchMap } from 'rxjs';

interface BlogState {
  comments: BlogComment[];
  entry?: BlogEntry;
  likes: BlogLike[];
}

@Injectable()
export class BlogStore extends ComponentStore<BlogState> {
  public readonly comments$ = this.select(x => x.comments);
  public readonly currentUser$ = this.store.pipe(select(selectSelectedUser));
  public readonly entry$ = this.select(x => x.entry);
  public readonly likes$ = this.select(x => x.likes);

  public loadComments = this.effect((id$: Observable<number | undefined>) =>
    id$.pipe(
      filter(Boolean),
      switchMap(id =>
        this.service.loadBlogComments(id).pipe(
          tapResponse(
            comments => this.patchState({ comments }),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  );

  public loadEntry = this.effect((id$: Observable<number | undefined>) =>
    id$.pipe(
      filter(Boolean),
      switchMap(id =>
        this.service.loadBlogEntry(id).pipe(
          tapResponse(
            entry => this.patchState({ entry }),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  );

  public loadLikes = this.effect((id$: Observable<number | undefined>) =>
    id$.pipe(
      filter(Boolean),
      switchMap(id =>
        this.service.loadBlogLikes(id).pipe(
          tapResponse(
            likes => this.patchState({ likes }),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  );

  public toggleLiked = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      concatLatestFrom(() => [this.currentUser$, this.entry$, this.likes$]),
      mergeMap(([_, currentUser, entry, likes]) =>
        currentUser && entry
          ? (includesUser(likes, currentUser)
              ? this.service.removeLike(entry.id, currentUser.id)
              : this.service.addLike(entry.id, currentUser.id)
            ).pipe(
              tapResponse(
                _ => this.loadLikes(entry.id),
                (error: HttpErrorResponse) => console.log(error)
              )
            )
          : EMPTY
      )
    )
  );

  constructor(private service: BlogsService, private store: Store) {
    super({ comments: [], likes: [] });
  }

  public initialise(): void {
    const routeParam$ = this.store
      .select(selectRouteParam('id'))
      .pipe(map(x => (x ? parseInt(x) : undefined)));

    this.loadComments(routeParam$);
    this.loadEntry(routeParam$);
    this.loadLikes(routeParam$);
  }
}
