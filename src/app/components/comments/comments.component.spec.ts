import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { BlogComment } from 'app/model';
import { MockComponent } from 'ng-mocks';
import { comments } from 'testing';

import { CommentsComponent } from './comments.component';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsComponent, MockComponent(MatFormField)],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getTitle()', () => {
    it(`returns 'No comments' if comments empty`, () => {
      const comments: BlogComment[] = [];
      const result = component.getTitle(comments);
      expect(result).toEqual('No comments');
    });

    it(`returns '1 comment' if only single comment`, () => {
      const comments: BlogComment[] = [{} as BlogComment];
      const result = component.getTitle(comments);
      expect(result).toEqual('1 comment');
    });

    it(`returns 'x comments' if multiple comments`, () => {
      const comments: BlogComment[] = [{} as BlogComment, {} as BlogComment];
      const result = component.getTitle(comments);
      expect(result).toEqual('2 comments');
    });
  });

  describe('onAddComment()', () => {
    it('emits commentAdded() if comment is not null', done => {
      component.commentAdded.asObservable().subscribe(_ => done());
      component.onAddComment('comment');
      expect().nothing();
    });

    it('emits nothing if comment is null', () => {
      component.commentAdded.asObservable().subscribe(_ => fail());
      component.onAddComment(null);
      expect().nothing();
    });
  });

  describe('trackComments()', () => {
    it('returns the comment id', () => {
      const result = component.trackComments(0, comments[0]);
      expect(result).toBe(comments[0].id);
    });
  });
});
