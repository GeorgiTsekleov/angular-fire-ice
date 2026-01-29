export interface FavoritesApiResponse {
  favoriteBookIds: string[];
}

export interface FavoritesRepository {
  getAll(): string[];
  add(bookId: string): void;
  remove(bookId: string): void;
}
