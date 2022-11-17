import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { BlogsService } from 'app/services';
import { mergeMap, Observable } from 'rxjs';

export interface BlogPost {
  content: string;
  title: string;
}

@Injectable()
export class EditBlogStore extends ComponentStore<{}> {
  private save = this.effect((post$: Observable<BlogPost>) =>
    post$.pipe(
      mergeMap(post =>
        this.service.saveBlogEntry(post.title, post.content, 1).pipe(
          tapResponse(
            _ => {
              console.log(`Blog post ${post.title} saved succesfully`);
              this.router.navigate(['/']);
            },
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  );

  constructor(private router: Router, private service: BlogsService) {
    super();
  }

  public saveBlogEntry(title: string, content: string): void {
    this.save({ content, title });
  }
}
