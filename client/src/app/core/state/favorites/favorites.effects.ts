import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { FavoritesApiService } from '../../services/api/favorites-api.service';
import {
  loadFavorites,
  loadFavoritesSuccess,
  loadFavoritesFailure,
  toggleFavorite,
  syncFavoritesSuccess,
  syncFavoritesFailure,
} from './favorites.actions';
import { selectFavoriteBookIds } from './favorites.selectors';

const loadFavoritesEffect = createEffect(
  (actions$ = inject(Actions), api = inject(FavoritesApiService)) =>
    actions$.pipe(
      ofType(loadFavorites),
      switchMap(() =>
        api.getFavorites().pipe(
          map((res) => loadFavoritesSuccess({ favoriteBookIds: res.favoriteBookIds })),
          catchError((err) =>
            of(loadFavoritesFailure({ error: err?.message ?? 'Failed to load favorites' })),
          ),
        ),
      ),
    ),
  { functional: true },
);

const toggleFavoriteEffect = createEffect(
  (actions$ = inject(Actions), api = inject(FavoritesApiService), store = inject(Store)) =>
    actions$.pipe(
      ofType(toggleFavorite),
      withLatestFrom(store.select(selectFavoriteBookIds)),
      switchMap(([{ bookId }, currentIds]) => {
        const isFavorite = currentIds.includes(bookId);
        const request = isFavorite ? api.removeFavorite(bookId) : api.addFavorite(bookId);

        return request.pipe(
          map((res) => syncFavoritesSuccess({ favoriteBookIds: res.favoriteBookIds })),
          catchError((err) => of(syncFavoritesFailure({ error: err?.message ?? 'Sync failed' }))),
        );
      }),
    ),
  { functional: true },
);

export const favoritesEffects = {
  loadFavoritesEffect,
  toggleFavoriteEffect,
};
