import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MockComponent } from 'ng-mocks';

import { BlogStore } from './blog.store';
import { ViewBlogComponent } from './view-blog.component';

describe('ViewBlogComponent', () => {
  let component: ViewBlogComponent;
  let fixture: ComponentFixture<ViewBlogComponent>;
  let store: jasmine.SpyObj<BlogStore>;

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
      declarations: [ViewBlogComponent, MockComponent(MatProgressSpinner)],
    })
      .overrideComponent(ViewBlogComponent, {
        set: {
          providers: [{ provide: BlogStore, useValue: store }],
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
});
