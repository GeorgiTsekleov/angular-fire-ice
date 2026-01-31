import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectBooks,
  selectBooksLoading,
  selectBooksError,
  selectSearchQuery,
  selectFilteredBooksByName,
} from '../state/books/books.selectors';
import { loadBooks, setSearchQuery } from '../state/books/books.actions';

@Injectable({ providedIn: 'root' })
export class BooksFacade {
  private readonly store = inject(Store);

  readonly books = this.store.selectSignal(selectBooks);
  readonly loading = this.store.selectSignal(selectBooksLoading);
  readonly error = this.store.selectSignal(selectBooksError);

  readonly filteredBooks = this.store.selectSignal(selectFilteredBooksByName);
  readonly searchQuery = this.store.selectSignal(selectSearchQuery);

  loadBooks(page?: number, pageSize?: number): void {
    this.store.dispatch(loadBooks({ page, pageSize }));
  }

  setSearchQuery(query: string): void {
    this.store.dispatch(setSearchQuery({ query }));
  }
}
