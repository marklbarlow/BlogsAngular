import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { BlogComment, BlogEntry, BlogLike, BlogPreview, User } from '../model';

@Injectable({ providedIn: 'root' })
export class BlogsService {
  constructor(private http: HttpClient) {}

  public addComment(
    blogId: number,
    text: string,
    userId: number
  ): Observable<void> {
    return this.http.post<void>(
      `${environment.baseUrl}/blogs/${blogId}/comments`,
      {
        text,
        userId,
      }
    );
  }

  public addLike(blogId: number, userId: number): Observable<void> {
    return this.http.put<void>(
      `${environment.baseUrl}/blogs/${blogId}/likes/${userId}`,
      {}
    );
  }

  public loadBlogComments(blogId: number): Observable<BlogComment[]> {
    return this.http.get<BlogComment[]>(
      `${environment.baseUrl}/blogs/${blogId}/comments`
    );
  }

  public loadBlogEntry(blogId: number): Observable<BlogEntry> {
    return this.http.get<BlogEntry>(`${environment.baseUrl}/blogs/${blogId}`);
  }

  public loadBlogLikes(blogId: number): Observable<BlogLike[]> {
    return this.http.get<BlogLike[]>(
      `${environment.baseUrl}/blogs/${blogId}/likes`
    );
  }

  public loadBlogPreviews(top: number): Observable<BlogPreview[]> {
    return this.http.get<BlogPreview[]>(
      `${environment.baseUrl}/blogs?top=${top}`
    );
  }

  public loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/users`);
  }

  public saveBlogEntry(
    title: string,
    text: string,
    userId: number
  ): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/blogs`, {
      text,
      title,
      userId,
    });
  }

  public removeLike(blogId: number, userId: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.baseUrl}/blogs/${blogId}/likes/${userId}`
    );
  }
}
