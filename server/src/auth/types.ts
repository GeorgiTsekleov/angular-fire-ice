import type { FavoriteBookIds, User } from "@angular-fire-ice/shared";

export interface UserEntity extends User {
  passwordHash: string;
  favorites?: FavoriteBookIds;
}

export interface UserRepository {
  findByEmail(email: string): UserEntity | undefined;
  findById(id: string): UserEntity | undefined;
  create(entity: UserEntity): void;
  updateFavorites(userId: string, favoriteBookIds: FavoriteBookIds): void;
}
