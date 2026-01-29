import type { FavoritesRepository } from "./types";
import { addToStore, removeFromStore } from "./favorites.store";

export class InMemoryFavoritesRepository implements FavoritesRepository {
  private store: string[] = [];

  getAll(): string[] {
    return [...this.store];
  }

  add(bookId: string): void {
    this.store = addToStore(this.store, bookId);
  }

  remove(bookId: string): void {
    this.store = removeFromStore(this.store, bookId);
  }

  reset(): void {
    this.store = [];
  }
}
