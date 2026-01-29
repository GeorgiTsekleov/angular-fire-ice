import { createAction, props } from '@ngrx/store';

export const toggleFavorite = createAction(
  '[Favorites] Toggle Favorite',
  props<{ bookId: string }>(),
);

export const loadFavorites = createAction('[Favorites] Load Favorites');
export const loadFavoritesSuccess = createAction(
  '[Favorites] Load Favorites Success',
  props<{ favoriteBookIds: string[] }>(),
);
export const loadFavoritesFailure = createAction(
  '[Favorites] Load Favorites Failure',
  props<{ error: string }>(),
);

export const syncFavoritesSuccess = createAction(
  '[Favorites] Sync Favorites Success',
  props<{ favoriteBookIds: string[] }>(),
);
export const syncFavoritesFailure = createAction(
  '[Favorites] Sync Favorites Failure',
  props<{ error: string }>(),
);
