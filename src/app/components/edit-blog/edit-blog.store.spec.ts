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

import { EditBlogStore } from './edit-blog.store';

describe('EditBlogStore', () => {
  let globalStore: MockStore;
  let router: Router;
  let service: jasmine.SpyObj<BlogsService>;
  let store: EditBlogStore;
  let userSelector: MemoizedSelector<State, User | undefined>;

  beforeEach(() => {
    service = jasmine.createSpyObj('service', ['saveBlogEntry']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        EditBlogStore,
        provideMockStore(),
        { provide: BlogsService, useValue: service },
      ],
    });

    globalStore = TestBed.inject(Store) as MockStore;
    router = TestBed.inject(Router);
    service = TestBed.inject(BlogsService) as jasmine.SpyObj<BlogsService>;
    store = TestBed.inject(EditBlogStore);

    userSelector = globalStore.overrideSelector(selectSelectedUser, users[0]);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  describe('saveBlogEntry()', () => {
    const content = 'Blog content';
    const title = 'Blog Title';

    beforeEach(() => {
      service.saveBlogEntry.and.returnValue(of(undefined));
    });

    it('should save the blog entry', () => {
      spyOn(router, 'navigate');

      store.saveBlogEntry(title, content);

      expect(service.saveBlogEntry).toHaveBeenCalledWith(
        title,
        content,
        users[0].id
      );
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should write to console if errors', () => {
      spyOn(console, 'error');
      service.saveBlogEntry.and.returnValue(throwError(() => new Error()));

      store.saveBlogEntry(title, content);

      expect(console.error).toHaveBeenCalled();
    });

    it('does nothing if no user selected', () => {
      userSelector.setResult(undefined);
      store.saveBlogEntry(title, content);

      expect(service.saveBlogEntry).not.toHaveBeenCalled();
    });
  });
});
