import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
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
} from './auth.actions';
import { ApiResponse, UserDto } from '@angular-fire-ice/shared';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(AuthApiService);

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
              }),
            ),
          ),
        ),
      ),
    ),
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
              }),
            );
          }),
        ),
      ),
    ),
  );

  readonly logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() =>
        this.api.logout().pipe(
          map(() => logoutSuccess()),
          catchError((err: HttpErrorResponse | null) =>
            of(logoutFailure({ error: err?.error?.error ?? err?.message ?? 'Logout failed' })),
          ),
        ),
      ),
    ),
  );
}
