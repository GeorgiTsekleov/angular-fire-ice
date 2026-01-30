import type { FavoriteBookIds } from "@angular-fire-ice/shared";

export function addToStore(
  store: FavoriteBookIds,
  bookId: string,
): FavoriteBookIds {
  if (store.includes(bookId)) return store;
  return [...store, bookId];
}

export function removeFromStore(
  store: FavoriteBookIds,
  bookId: string,
): FavoriteBookIds {
  return store.filter((id: string) => id !== bookId);
}
