import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthApiService } from '../../services/api/auth-api.service';
import { register, registerSuccess, registerFailure } from './auth.actions';

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
}
