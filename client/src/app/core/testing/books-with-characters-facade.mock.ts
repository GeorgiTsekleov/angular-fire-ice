import { signal, type Signal } from '@angular/core';
import {
  BooksWithCharactersFacade,
  BookWithCharacters,
} from '../services/books-with-characters.facade';
import { vi } from 'vitest';

export function createMockBooksWithCharactersFacade(
  overrides?: Partial<BooksWithCharactersFacade>
): BooksWithCharactersFacade {
  return {
    booksWithCharacters:
      (overrides?.booksWithCharacters as Signal<BookWithCharacters[]>) ?? signal([]),
    loading: (overrides?.loading as Signal<boolean>) ?? signal(false),
    error: (overrides?.error as Signal<string | null>) ?? signal(null),
    loadBooksWithCharacters: vi.fn(),
    ...overrides,
  } as BooksWithCharactersFacade;
}

export function provideMockBooksWithCharactersFacade(
  overrides?: Partial<BooksWithCharactersFacade>
) {
  return {
    provide: BooksWithCharactersFacade,
    useValue: createMockBooksWithCharactersFacade(overrides),
  };
}
