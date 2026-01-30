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
}
