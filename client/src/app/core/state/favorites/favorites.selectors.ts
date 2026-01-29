import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.state';

export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

export const selectFavoriteBookIds = createSelector(
  selectFavoritesState,
  (state) => state.favoriteBookIds,
);

export const selectFavoritesCount = createSelector(selectFavoriteBookIds, (ids) => ids.length);

export const selectIsFavorite = (bookId: string) =>
  createSelector(selectFavoriteBookIds, (ids) => ids.includes(bookId));
