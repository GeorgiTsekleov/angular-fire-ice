import type { FavoriteBookIds } from "@angular-fire-ice/shared";

export interface FavoritesApiResponse {
  favoriteBookIds: FavoriteBookIds;
}

export interface FavoritesRepository {
  getAll(): FavoriteBookIds;
  add(bookId: string): void;
  remove(bookId: string): void;
  reset(): void;
}
