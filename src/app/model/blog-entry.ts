import { BlogComment } from './blog-comment';
import { BlogLike } from './blog-like';

export interface BlogEntry {
  id: number;
  text: string;
  timestamp: string;
  title: string;
  userId: number;
  userName: string;
}
