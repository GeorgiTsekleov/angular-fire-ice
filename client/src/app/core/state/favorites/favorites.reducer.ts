import { createReducer, on } from '@ngrx/store';
import { FavoritesState, initialFavoritesState } from './favorites.state';
import { toggleFavorite } from './favorites.actions';

const addFavorite = (state: FavoritesState, bookId: string) => [...state.favoriteBookIds, bookId];
const removeFavorite = (state: FavoritesState, bookId: string) =>
  state.favoriteBookIds.filter((id) => id !== bookId);

export const favoritesReducer = createReducer(
  initialFavoritesState,
  on(toggleFavorite, (state, { bookId }) => {
    const includes = state.favoriteBookIds.includes(bookId);

    return {
      ...state,
      favoriteBookIds: includes ? removeFavorite(state, bookId) : addFavorite(state, bookId),
    };
  }),
);
