import { signal, type Signal } from '@angular/core';
import { BookDetailFacade } from '../services/book-detail.facade';
import { Book } from '../models/book.model';
import { Character } from '../models/character.model';
import { vi } from 'vitest';

export function createMockBookDetailFacade(
  overrides?: Partial<BookDetailFacade>
): BookDetailFacade {
  return {
    book: (overrides?.book as Signal<Book | null>) ?? signal(null),
    characters: (overrides?.characters as Signal<Character[]>) ?? signal([]),
    loading: (overrides?.loading as Signal<boolean>) ?? signal(false),
    error: (overrides?.error as Signal<string | null>) ?? signal(null),
    load: vi.fn(),
    getBookId: vi.fn((url: string) => url.split('/').filter(Boolean).pop() ?? ''),
    getCharacterId: vi.fn((url: string) => url.split('/').filter(Boolean).pop() ?? ''),
    getCharacterDisplayName: vi.fn((c: Character) => c?.playedBy?.[0] ?? c?.name ?? ''),
    getDisplayableCharacters: vi.fn((chars: Character[]) => chars ?? []),
    getAuthors: vi.fn(() => '—'),
    getReleased: vi.fn(() => '—'),
    getDescription: vi.fn(() => ''),
    getMetaRows: vi.fn(() => []),
    ...overrides,
  } as BookDetailFacade;
}

export function provideMockBookDetailFacade(overrides?: Partial<BookDetailFacade>) {
  return {
    provide: BookDetailFacade,
    useValue: createMockBookDetailFacade(overrides),
  };
}
