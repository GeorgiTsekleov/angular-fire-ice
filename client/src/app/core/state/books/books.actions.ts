import { createAction, props } from '@ngrx/store';
import { Book } from '../../models';

export const loadBooks = createAction(
  '[Books] Load Books',
  props<{ page?: number; pageSize?: number }>(),
);

export const loadBooksSuccess = createAction(
  '[Books] Load Books Success',
  props<{ books: Book[] }>(),
);

export const loadBooksFailure = createAction(
  '[Books] Load Books Failure',
  props<{ error: string }>(),
);
