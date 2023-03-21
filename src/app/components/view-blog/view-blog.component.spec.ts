import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBlogComponent } from './view-blog.component';
import { ViewBlogStore } from './view-blog.store';

describe('ViewBlogComponent', () => {
  let component: ViewBlogComponent;
  let fixture: ComponentFixture<ViewBlogComponent>;
  let store: jasmine.SpyObj<ViewBlogStore>;

  beforeEach(async () => {
    store = jasmine.createSpyObj('store', [
      'addComment',
      'loadComments',
      'loadEntry',
      'loadLikes',
      'toggleLiked',
      'initialise',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ViewBlogComponent],
    })
      .overrideComponent(ViewBlogComponent, {
        set: {
          providers: [{ provide: ViewBlogStore, useValue: store }],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ViewBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onCommentAdded()', () => {
    it('adds the comment', () => {
      const comment = 'This is a comment';
      component.onCommentAdded(comment);
      expect(store.addComment).toHaveBeenCalledWith(comment);
    });
  });

  describe('onLikeToggled()', () => {
    it('toggles the liked', () => {
      component.onLikeToggled();
      expect(store.toggleLiked).toHaveBeenCalled();
    });
  });
});
