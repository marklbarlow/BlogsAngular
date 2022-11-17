import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { BlogPreview } from 'app/model';
import { BlogsService } from 'app/services';
import { Observable, switchMap } from 'rxjs';

interface HomeState {
  previews: BlogPreview[];
}

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  public readonly previews$ = this.select(x => x.previews);

  public loadPreviews = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      switchMap(_ =>
        this.service.loadBlogPreviews().pipe(
          tapResponse(
            previews => this.setState({ previews }),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  );

  constructor(private service: BlogsService) {
    super({ previews: [] });
  }
}
