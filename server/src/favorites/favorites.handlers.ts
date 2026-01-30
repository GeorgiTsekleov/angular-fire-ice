import type { Request, Response } from "express";
import type { FavoriteBookIds } from "@angular-fire-ice/shared";
import type { FavoritesRepository, FavoritesApiResponse } from "./types";

function toResponse(ids: FavoriteBookIds): FavoritesApiResponse {
  return { favoriteBookIds: ids };
}

export function getFavorites(
  _req: Request,
  res: Response,
  repository: FavoritesRepository,
): void {
  const favoriteBookIds = repository.getAll();
  res.json(toResponse(favoriteBookIds));
}

export function addFavorite(
  req: Request,
  res: Response,
  repository: FavoritesRepository,
): void {
  const { bookId } = req.body ?? {};
  if (typeof bookId !== "string") {
    res.status(400).json(toResponse(repository.getAll()));
    return;
  }
  repository.add(bookId);
  res.json(toResponse(repository.getAll()));
}

export function removeFavorite(
  req: Request,
  res: Response,
  repository: FavoritesRepository,
): void {
  const raw = req.params.bookId;
  const bookId = decodeURIComponent(
    Array.isArray(raw) ? (raw[0] ?? "") : (raw ?? ""),
  );
  repository.remove(bookId);
  res.json(toResponse(repository.getAll()));
}
