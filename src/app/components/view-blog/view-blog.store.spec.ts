import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { User } from 'app/model';
import { BlogsService } from 'app/services';
import { selectSelectedUser, State } from 'app/store';
import { of, throwError } from 'rxjs';
import { users } from 'testing';

import { ViewBlogStore } from './view-blog.store';

describe('ViewBlogStore', () => {
  let globalStore: MockStore;
  let router: Router;
  let service: jasmine.SpyObj<BlogsService>;
  let store: ViewBlogStore;
  let userSelector: MemoizedSelector<State, User | undefined>;

  beforeEach(() => {
    service = jasmine.createSpyObj('service', [
      'addComment',
      'addLike',
      'loadBlogComments',
      'loadBlogEntry',
      'loadLikes',
      'removeLike',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ViewBlogStore,
        provideMockStore(),
        { provide: BlogsService, useValue: service },
      ],
    });

    globalStore = TestBed.inject(Store) as MockStore;
    router = TestBed.inject(Router);
    service = TestBed.inject(BlogsService) as jasmine.SpyObj<BlogsService>;
    store = TestBed.inject(ViewBlogStore);

    userSelector = globalStore.overrideSelector(selectSelectedUser, users[0]);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });
});
