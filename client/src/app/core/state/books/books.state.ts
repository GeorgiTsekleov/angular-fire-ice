import { Book } from '../../models';

export interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export const initialBooksState: BooksState = {
  books: [],
  loading: false,
  error: null,
  searchQuery: '',
};
