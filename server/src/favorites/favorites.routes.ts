import type { Express } from "express";
import type { FavoritesRepository } from "./types";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "./favorites.handlers";

export function registerFavoritesRoutes(
  app: Express,
  repository: FavoritesRepository,
): void {
  app.get("/api/favorites", (req, res) => getFavorites(req, res, repository));
  app.post("/api/favorites", (req, res) => addFavorite(req, res, repository));
  app.delete("/api/favorites/:bookId", (req, res) =>
    removeFavorite(req, res, repository),
  );
}
