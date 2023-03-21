import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogLike } from 'app/model';
import { users } from 'testing';

import { LikesComponent } from './likes.component';

describe('LikesComponent', () => {
  let component: LikesComponent;
  let fixture: ComponentFixture<LikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LikesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getFontSet()', () => {
    it('returns normal icons if user has liked', () => {
      component.currentUser = users[0];
      component.likes = [
        { blogEntryId: 1, userId: users[0].id, username: users[0].name },
      ];
      const result = component.getFontSet();
      expect(result).toEqual('material-icons');
    });

    it('returns outline icons if user has not liked', () => {
      const result = component.getFontSet();
      expect(result).toEqual('material-icons-outlined');
    });
  });

  describe('getTooltip()', () => {
    it('returns the list of likes', () => {
      component.likes = [
        { username: 'John Smith' } as BlogLike,
        { username: 'Homer Simpson' } as BlogLike,
      ];
      const result = component.getTooltip();
      expect(result).toEqual('Liked by John Smith, Homer Simpson');
    });

    it('returns an empty string if no likes', () => {
      component.likes = [];
      const result = component.getTooltip();
      expect(result).toBe('');
    });
  });

  describe('onLikeToggled()', () => {
    it(`emits a 'likeToggled' event`, done => {
      component.likeToggled.asObservable().subscribe(_ => done());
      component.onLikeToggled();
      expect().nothing();
    });
  });
});
