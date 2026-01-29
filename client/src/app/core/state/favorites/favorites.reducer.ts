import { createReducer, on } from '@ngrx/store';
import { initialFavoritesState } from './favorites.state';
import { loadFavoritesSuccess, syncFavoritesSuccess } from './favorites.actions';

export const favoritesReducer = createReducer(
  initialFavoritesState,
  on(loadFavoritesSuccess, (state, { favoriteBookIds }) => ({
    ...state,
    favoriteBookIds,
  })),
  on(syncFavoritesSuccess, (state, { favoriteBookIds }) => ({
    ...state,
    favoriteBookIds,
  })),
);
