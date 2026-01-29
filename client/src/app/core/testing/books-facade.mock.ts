import { signal, type Signal } from '@angular/core';
import { BooksFacade } from '../services/books.facade';
import { Book } from '../models';
import { vi } from 'vitest';

export function createMockBooksFacade(overrides?: Partial<BooksFacade>): BooksFacade {
  return {
    books: (overrides?.books as Signal<Book[]>) ?? signal([]),
    loading: (overrides?.loading as Signal<boolean>) ?? signal(false),
    error: (overrides?.error as Signal<string | null>) ?? signal(null),
    loadBooks: vi.fn(),
    ...overrides,
  } as BooksFacade;
}

export function provideMockBooksFacade(overrides?: Partial<BooksFacade>) {
  return {
    provide: BooksFacade,
    useValue: createMockBooksFacade(overrides),
  };
}
