import type { Request, Response } from "express";
import type { FavoriteBookIds } from "@angular-fire-ice/shared";
import type { FavoritesApiResponse } from "./types";
import type { UserEntity, UserRepository } from "../auth/types";
import { addToStore, removeFromStore } from "./favorites.store";

function toResponse(ids: FavoriteBookIds): FavoritesApiResponse {
  return { favoriteBookIds: ids };
}

function getAuthenticatedUser(
  req: Request,
  res: Response,
  userRepository: UserRepository,
): { userId: string; user: UserEntity } | null {
  const userId = (req.session as { userId?: string }).userId;
  if (!userId) {
    res.status(401).json({ success: false, error: "Not authenticated" });
    return null;
  }
  const user = userRepository.findById(userId);
  if (!user) {
    res.status(401).json({ success: false, error: "Not authenticated" });
    return null;
  }

  return { userId, user };
}

export function getFavorites(
  req: Request,
  res: Response,
  userRepository: UserRepository,
): void {
  const auth = getAuthenticatedUser(req, res, userRepository);
  if (!auth) return;
  const favoriteBookIds = auth.user.favorites ?? [];
  res.json(toResponse(favoriteBookIds));
}

export function addFavorite(
  req: Request,
  res: Response,
  userRepository: UserRepository,
): void {
  const auth = getAuthenticatedUser(req, res, userRepository);
  if (!auth) return;
  const { userId, user } = auth;

  const { bookId } = req.body ?? {};
  if (typeof bookId !== "string") {
    res.status(400).json(toResponse(user.favorites ?? []));
    return;
  }

  const current = user.favorites ?? [];
  const next = addToStore(current, bookId);
  userRepository.updateFavorites(userId, next);
  res.json(toResponse(next));
}

export function removeFavorite(
  req: Request,
  res: Response,
  userRepository: UserRepository,
): void {
  const auth = getAuthenticatedUser(req, res, userRepository);
  if (!auth) return;
  const { userId, user } = auth;

  const bookId = req.params.bookId;
  if (typeof bookId !== "string") {
    res.status(400).json(toResponse(user.favorites ?? []));
    return;
  }

  const current = user.favorites ?? [];
  const next = removeFromStore(current, bookId);
  userRepository.updateFavorites(userId, next);
  res.json(toResponse(next));
}
