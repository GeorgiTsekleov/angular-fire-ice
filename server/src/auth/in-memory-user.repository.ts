import type { FavoriteBookIds } from "@angular-fire-ice/shared";
import type { UserRepository, UserEntity } from "./types";

export class InMemoryUserRepository implements UserRepository {
  private readonly users: UserEntity[] = [];

  findByEmail(email: string): UserEntity | undefined {
    const normalised = email.trim().toLowerCase();
    return this.users.find((u) => u.email.trim().toLowerCase() === normalised);
  }

  findById(id: string): UserEntity | undefined {
    return this.users.find((u) => u.id === id);
  }

  create(entity: UserEntity): void {
    this.users.push(entity);
  }

  updateFavorites(userId: string, favoriteBookIds: FavoriteBookIds): void {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      user.favorites = [...favoriteBookIds];
    }
  }
}
