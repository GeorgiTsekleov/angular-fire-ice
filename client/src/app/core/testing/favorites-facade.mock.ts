import { signal, type Signal } from '@angular/core';
import { FavoritesFacade } from '../services/favorites.facade';
import { vi } from 'vitest';

export function createMockFavoritesFacade(overrides?: Partial<FavoritesFacade>): FavoritesFacade {
  const favoriteBookIds = (overrides?.favoriteBookIds as Signal<string[]>) ?? signal([]);
  const favoritesCount = (overrides?.favoritesCount as Signal<number>) ?? signal(0);
  return {
    favoriteBookIds,
    favoritesCount,
    loadFavorites: vi.fn(),
    toggleFavorite: vi.fn(),
    isFavorite: (bookId: string) => favoriteBookIds().includes(bookId),
    ...overrides,
  } as FavoritesFacade;
}

export function provideMockFavoritesFacade(overrides?: Partial<FavoritesFacade>) {
  return {
    provide: FavoritesFacade,
    useValue: createMockFavoritesFacade(overrides),
  };
}
