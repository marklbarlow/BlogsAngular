import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { comments, entry, likes, previews } from 'testing';
import { BlogComment, BlogEntry, BlogLike, BlogPreview, User } from '../model';

@Injectable({ providedIn: 'root' })
export class BlogsService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  public loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  public loadBlogPreviews(top: number = 5): Observable<BlogPreview[]> {
    return of(previews);
    return this.http.get<BlogPreview[]>(`${this.baseUrl}/blogs?top=${top}`);
  }

  public loadBlogComments(blogId: number): Observable<BlogComment[]> {
    return of(comments);
    return this.http.get<BlogComment[]>(
      `${this.baseUrl}/blogs/${blogId}/comments`
    );
  }

  public loadBlogEntry(blogId: number): Observable<BlogEntry> {
    return of(entry);
    return this.http.get<BlogEntry>(`${this.baseUrl}/blogs/${blogId}`);
  }

  public loadBlogLikes(blogId: number): Observable<BlogLike[]> {
    return of(likes);
    return this.http.get<BlogLike[]>(`${this.baseUrl}/blogs/${blogId}/likes`);
  }

  public saveBlogEntry(
    title: string,
    content: string,
    userId: number
  ): Observable<void> {
    console.log('Saving blog entry', title, content);
    return of();
    return this.http.post<void>(`${this.baseUrl}/blogs`, { content, title });
  }

  public addComment(
    blogId: number,
    text: string,
    userId: number
  ): Observable<BlogEntry> {
    return this.http.post<BlogEntry>(
      `${this.baseUrl}/blogs/${blogId}/comments`,
      { text, userId }
    );
  }

  public addLike(blogId: number, userId: number): Observable<BlogEntry> {
    return this.http.put<BlogEntry>(
      `${this.baseUrl}/${blogId}/like/${userId}`,
      {}
    );
  }

  public removeLike(blogId: number, userId: number): Observable<BlogEntry> {
    return this.http.delete<BlogEntry>(
      `${this.baseUrl}/${blogId}/like/${userId}`
    );
  }
}
