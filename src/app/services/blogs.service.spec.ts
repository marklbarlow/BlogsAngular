import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'environments/environment';
import {
  comments,
  entry,
  flushDeleteUrl,
  flushGetUrl,
  flushPostUrl,
  flushPutUrl,
  likes,
  previews,
  users,
} from 'testing';

import { BlogsService } from './blogs.service';

describe('BlogsService', () => {
  let service: BlogsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(BlogsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addComment()', () => {
    it('adds a comment', done => {
      const blogId = 1;
      const text = 'This is a comment';
      const userId = 1;

      service.addComment(blogId, text, userId).subscribe(_ => done());

      const url = `${environment.baseUrl}/blogs/${blogId}/comments`;
      flushPostUrl(httpMock, url, null, { text, userId });
      expect().nothing();
    });
  });

  describe('addLike()', () => {
    it('adds a like', done => {
      const blogId = 1;
      const userId = 1;

      service.addLike(blogId, userId).subscribe(_ => done());

      const url = `${environment.baseUrl}/blogs/${blogId}/likes/${userId}`;
      flushPutUrl(httpMock, url, null, {});
      expect().nothing();
    });
  });

  describe('loadBlogComments()', () => {
    it('returns the comments', done => {
      const blogId = 1;
      const url = `${environment.baseUrl}/blogs/${blogId}/comments`;

      service.loadBlogComments(blogId).subscribe(x => {
        expect(x).toBe(comments);
        done();
      });

      flushGetUrl(httpMock, url, comments);
    });
  });

  describe('loadBlogEntry()', () => {
    it('returns the entry', done => {
      const blogId = 1;

      service.loadBlogEntry(blogId).subscribe(x => {
        expect(x).toBe(entry);
        done();
      });

      const url = `${environment.baseUrl}/blogs/${blogId}`;
      flushGetUrl(httpMock, url, entry);
    });
  });

  describe('loadBlogLikes()', () => {
    it('returns the likes', done => {
      const blogId = 1;
      service.loadBlogLikes(blogId).subscribe(x => {
        expect(x).toBe(likes);
        done();
      });

      const url = `${environment.baseUrl}/blogs/${blogId}/likes`;
      flushGetUrl(httpMock, url, likes);
    });
  });

  describe('loadBlogPreviews()', () => {
    it('returns the previews', done => {
      const top = 10;
      service.loadBlogPreviews(top).subscribe(x => {
        expect(x).toBe(previews);
        done();
      });

      const url = `${environment.baseUrl}/blogs?top=${top}`;
      flushGetUrl(httpMock, url, previews);
    });
  });

  describe('loadUsers()', () => {
    it('returns the list of users', done => {
      const url = `${environment.baseUrl}/users`;

      service.loadUsers().subscribe(x => {
        expect(x).toBe(users);
        done();
      });

      flushGetUrl(httpMock, url, users);
    });
  });

  describe('saveBlogEntry()', () => {
    it('saves the blog entry', done => {
      const text = 'text';
      const title = 'title';
      const userId = 1;
      const url = `${environment.baseUrl}/blogs`;

      service.saveBlogEntry(title, text, userId).subscribe(_ => done());

      flushPostUrl(httpMock, url, null, { text, title, userId });
    });
  });

  describe('removeLike()', () => {
    it('removes a like', done => {
      const blogId = 1;
      const userId = 1;
      const url = `${environment.baseUrl}/blogs/${blogId}/likes/${userId}`;

      service.removeLike(blogId, userId).subscribe(_ => done());

      flushDeleteUrl(httpMock, url, null);
      expect().nothing();
    });
  });
});
