import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { BlogComment, BlogEntry, BlogLike } from 'app/model';
import { BlogsService } from 'app/services';
import { selectRouteParam, selectRouteParams } from 'app/store';
import { filter, map, Observable, switchMap } from 'rxjs';

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

  public loadComments = this.effect(
    (trigger$: Observable<number | undefined>) =>
      trigger$.pipe(
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

  public loadEntry = this.effect((trigger$: Observable<number | undefined>) =>
    trigger$.pipe(
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

  public loadLikes = this.effect((trigger$: Observable<number | undefined>) =>
    trigger$.pipe(
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
function concatLatestFrom(
  arg0: () => Observable<import('@angular/router').Params>
): import('rxjs').OperatorFunction<void, unknown> {
  throw new Error('Function not implemented.');
}
