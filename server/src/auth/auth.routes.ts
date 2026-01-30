import type { Express } from "express";
import type { UserRepository } from "./types";
import { register as registerHandler } from "./register/register.handlers";
import { login as loginHandler } from "./login/login.handlers";
import type { FavoritesRepository } from "../favorites/types";
import { getMe } from "./me/me.handlers";
import { logout } from "./logout/logout.handlers";

export function authRoutes(
  app: Express,
  userRepository: UserRepository,
  favoritesRepository: FavoritesRepository,
): void {
  app.post("/api/auth/register", (req, res) =>
    registerHandler(req, res, userRepository, favoritesRepository),
  );
  app.post("/api/auth/login", (req, res) =>
    loginHandler(req, res, userRepository, favoritesRepository),
  );
  app.get("/api/auth/me", (req, res) => getMe(req, res, userRepository, ));
  app.post("/api/auth/logout", logout);
}
