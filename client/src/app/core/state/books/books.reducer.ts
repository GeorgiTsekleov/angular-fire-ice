import { createReducer, on } from '@ngrx/store';
import { initialBooksState } from './books.state';
import { loadBooks, loadBooksSuccess, loadBooksFailure, setSearchQuery } from './books.actions';

export const booksReducer = createReducer(
  initialBooksState,
  on(loadBooks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadBooksSuccess, (state, { books }) => ({
    ...state,
    books,
    loading: false,
    error: null,
  })),
  on(loadBooksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(setSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query.trim().toLowerCase(),
  })),
);
