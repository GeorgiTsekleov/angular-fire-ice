import { User } from "@angular-fire-ice/shared";

export interface UserEntity extends User {
  passwordHash: string;
}

export interface UserRepository {
  findByEmail(email: string): UserEntity | undefined;
  create(entity: UserEntity): void;
}
