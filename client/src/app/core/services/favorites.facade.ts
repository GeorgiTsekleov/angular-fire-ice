import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectFavoriteBookIds,
  selectFavoritesCount,
} from '../state/favorites/favorites.selectors';
import { toggleFavorite, loadFavorites } from '../state/favorites/favorites.actions';
import { Book } from '../models';

@Injectable({ providedIn: 'root' })
export class FavoritesFacade {
  private readonly store = inject(Store);

  readonly favoriteBookIds = this.store.selectSignal(selectFavoriteBookIds);
  readonly favoritesCount = this.store.selectSignal(selectFavoritesCount);

  loadFavorites(): void {
    this.store.dispatch(loadFavorites());
  }

  toggleFavorite(book: Book): void {
    this.store.dispatch(toggleFavorite({ bookId: book.url }));
  }

  isFavorite(bookId: string): boolean {
    return this.favoriteBookIds().includes(bookId);
  }
}
