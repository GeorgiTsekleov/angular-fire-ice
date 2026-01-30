import type { Express } from "express";
import type { UserRepository } from "./types";
import { register as registerHandler } from "./register/register.handlers";
import { FavoritesRepository } from "../favorites/types";

export function registerAuthRoutes(
  app: Express,
  userRepository: UserRepository,
  favoritesRepository: FavoritesRepository,
): void {
  app.post("/api/auth/register", (req, res) =>
    registerHandler(req, res, userRepository, favoritesRepository),
  );
}
