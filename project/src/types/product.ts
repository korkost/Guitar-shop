import { Comment } from './comment';
import { Guitar } from './guitar';

export type Product = Guitar & { comments: Comment[] };
