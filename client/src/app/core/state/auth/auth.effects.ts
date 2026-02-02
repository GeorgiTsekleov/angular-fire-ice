import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthApiService } from '../../services/api/auth-api.service';
import {
  register,
  registerSuccess,
  registerFailure,
  checkAuth,
  checkAuthSuccess,
  checkAuthFailure,
  logout,
  logoutFailure,
  logoutSuccess,
  login,
  loginSuccess,
  loginFailure,
} from './auth.actions';
import { loadFavoritesSuccess } from '../favorites/favorites.actions';
import { selectFavoriteBookIds } from '../favorites/favorites.selectors';
import { ApiResponse, UserDto } from '@angular-fire-ice/shared';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(AuthApiService);
  private readonly store = inject(Store);

  readonly register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap(({ credentials }) =>
        this.api.register(credentials).pipe(
          map((res) => {
            if (res.success && res.data) {
              return registerSuccess({ user: res.data });
            }
            return registerFailure({
              error: res.error ?? 'Registration failed',
            });
          }),
          catchError((err) =>
            of(
              registerFailure({
                error: err?.error?.error ?? err?.message ?? 'Registration failed',
              })
            )
          )
        )
      )
    )
  );

  readonly checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAuth),
      switchMap(() =>
        this.api.getMe().pipe(
          map((res: ApiResponse<UserDto>) => {
            if (res.success && res.data) {
              return checkAuthSuccess({ user: res.data });
            }
            return checkAuthSuccess({ user: null });
          }),
          catchError((err) => {
            if (err?.status === 401) {
              return of(checkAuthSuccess({ user: null }));
            }
            return of(
              checkAuthFailure({
                error: err?.error?.error ?? err?.message ?? 'Failed to check auth',
              })
            );
          })
        )
      )
    )
  );

  readonly logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() =>
        this.api.logout().pipe(
          map(() => logoutSuccess()),
          catchError((err: HttpErrorResponse | null) =>
            of(logoutFailure({ error: err?.error?.error ?? err?.message ?? 'Logout failed' }))
          )
        )
      )
    )
  );

  readonly login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ credentials }) =>
        this.api.login(credentials).pipe(
          map((res) => {
            if (res.success && res.data) {
              return loginSuccess({ user: res.data });
            }
            return loginFailure({
              error: res.error ?? 'Login failed',
            });
          }),
          catchError((err) =>
            of(
              loginFailure({
                error: err?.error?.error ?? err?.message ?? 'Login failed',
              })
            )
          )
        )
      )
    )
  );

  readonly seedFavoritesFromAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAuthSuccess, loginSuccess, logoutSuccess),
      withLatestFrom(this.store.select(selectFavoriteBookIds)),
      filter(([action, currentIds]) => {
        if (action.type === logoutSuccess.type) return true;
        if (action.type === loginSuccess.type) return true;
        if (action.type === checkAuthSuccess.type) {
          const hasUser = 'user' in action && action.user != null;
          if (!hasUser) return true;
          return currentIds.length === 0;
        }
        
        return false;
      }),
      map(([action]) =>
        loadFavoritesSuccess({
          favoriteBookIds: 'user' in action && action.user ? action.user.favorites ?? [] : [],
        })
      )
    )
  );
}
