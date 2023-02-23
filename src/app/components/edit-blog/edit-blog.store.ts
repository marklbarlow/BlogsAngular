import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { BlogsService } from 'app/services';
import { selectSelectedUser } from 'app/store';
import { EMPTY, mergeMap, Observable } from 'rxjs';

@Injectable()
export class EditBlogStore extends ComponentStore<{}> {
  private save = this.effect(
    (
      post$: Observable<{
        content: string;
        title: string;
      }>
    ) =>
      post$.pipe(
        concatLatestFrom(() => this.store.pipe(select(selectSelectedUser))),
        mergeMap(([post, user]) =>
          user
            ? this.service
                .saveBlogEntry(post.title, post.content, user.id)
                .pipe(
                  tapResponse(
                    _ => {
                      console.log(
                        `Blog post '${post.title}' saved succesfully`
                      );
                      this.router.navigate(['/']);
                    },
                    (error: HttpErrorResponse) => console.error(error)
                  )
                )
            : EMPTY
        )
      )
  );

  constructor(
    private router: Router,
    private service: BlogsService,
    private store: Store
  ) {
    super({});
  }

  public saveBlogEntry(title: string, content: string): void {
    this.save({ content, title });
  }
}
