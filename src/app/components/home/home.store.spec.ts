import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { BlogsService } from 'app/services';
import { of, throwError } from 'rxjs';
import { expectLastValue, expectStream, previews } from 'testing';

import { HomeStore } from './home.store';

describe('HomeStore', () => {
  let service: jasmine.SpyObj<BlogsService>;
  let store: HomeStore;

  beforeEach(() => {
    service = jasmine.createSpyObj('service', ['loadBlogPreviews'], {
      previews$: previews,
    });

    TestBed.configureTestingModule({
      providers: [
        HomeStore,
        provideMockStore(),
        { provide: BlogsService, useValue: service },
      ],
    });

    service = TestBed.inject(BlogsService) as jasmine.SpyObj<BlogsService>;
    store = TestBed.inject(HomeStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  describe('previews$', () => {
    it('selects the previews', () => {
      store.patchState({ previews });

      expectLastValue(store.previews$, previews);
    });
  });

  describe('loadPreviews()', () => {
    it('loads the previews', () => {
      service.loadBlogPreviews.and.returnValue(of(previews));

      store.loadPreviews();

      expectStream(store.previews$, [previews], () => store.loadPreviews());
      expect(service.loadBlogPreviews).toHaveBeenCalledWith(5);
    });

    it('should write to console if errors', () => {
      spyOn(console, 'error');
      service.loadBlogPreviews.and.returnValue(throwError(() => new Error()));

      expectStream(store.previews$, [undefined], () => store.loadPreviews());
      expect(console.error).toHaveBeenCalled();
    });
  });
});
