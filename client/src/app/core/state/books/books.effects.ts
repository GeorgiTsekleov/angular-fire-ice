import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IceAndFireApiService } from '../../services/ice-and-fire-api.service';
import { loadBooks, loadBooksSuccess, loadBooksFailure } from './books.actions';

@Injectable()
export class BooksEffects {
  protected readonly actions$ = inject(Actions);
  protected readonly api = inject(IceAndFireApiService);

  protected readonly loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBooks),
      switchMap(({ page, pageSize }) =>
        this.api.getAllBooks(page ?? 1, pageSize ?? 10).pipe(
          map((books) => loadBooksSuccess({ books })),
          catchError((err) =>
            of(loadBooksFailure({ error: err.message ?? 'Failed to load books' })),
          ),
        ),
      ),
    ),
  );
}
