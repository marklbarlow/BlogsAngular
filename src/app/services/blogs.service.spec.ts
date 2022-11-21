import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BlogsService } from './blogs.service';

describe('BlogsService', () => {
  let service: BlogsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(BlogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // describe('loadUsers()', () => {
  //   it('should return the list of users', done => {
  //     const expectedUrl = '';

  //     service.loadUsers().subscribe(x => {
  //       expect(x).toBe(users);
  //       done();
  //     });

  //     const req = httpMock.expectOne({ method: 'GET', url: expectedUrl });
  //     req.flush(users);
  //   });
  // });
});
