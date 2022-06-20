import { Comment } from './comment';
import { Guitar } from './guitar';

export interface Product extends Guitar {
  comments: Comment[];
}
