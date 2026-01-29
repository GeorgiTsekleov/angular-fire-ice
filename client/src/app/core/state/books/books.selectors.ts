import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState } from './books.state';

export const selectBooksState = createFeatureSelector<BooksState>('books');

export const selectBooks = createSelector(selectBooksState, (state) => state.books);
export const selectBooksLoading = createSelector(selectBooksState, (state) => state.loading);
export const selectBooksError = createSelector(selectBooksState, (state) => state.error);
