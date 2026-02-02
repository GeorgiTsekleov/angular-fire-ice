import type { Express } from "express";
import type { UserRepository } from "../auth/types";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "./favorites.handlers";

export function registerFavoritesRoutes(
  app: Express,
  userRepository: UserRepository,
): void {
  app.get("/api/favorites", (req, res) =>
    getFavorites(req, res, userRepository),
  );
  app.post("/api/favorites", (req, res) =>
    addFavorite(req, res, userRepository),
  );
  app.delete("/api/favorites/:bookId", (req, res) =>
    removeFavorite(req, res, userRepository),
  );
}
