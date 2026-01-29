import express, { type Express } from "express";
import "dotenv/config";
import { User, ApiResponse } from "@angular-fire-ice/shared";
import type { FavoritesRepository } from "./favorites/types";
import { InMemoryFavoritesRepository } from "./favorites/in-memory-favorites.repository";
import { registerFavoritesRoutes } from "./favorites/favorites.routes";

export function createApp(favoritesRepository?: FavoritesRepository): Express {
  const app = express();

  app.use((req, res, next) => {
    const origin = process.env.CLIENT_URL || "http://localhost:4200";
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }

    next();
  });

  app.use(express.json());

  app.get("/", (_req, res) => {
    res.send("Hello from Express server!");
  });

  app.get("/api/test-user", (_req, res) => {
    const testUser: User = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
    };

    const response: ApiResponse<User> = {
      success: true,
      data: testUser,
    };

    res.json(response);
  });

  const repo = favoritesRepository ?? new InMemoryFavoritesRepository();
  registerFavoritesRoutes(app, repo);

  return app;
}

export const app = createApp();

if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT) || 8080;
  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Invalid PORT value: "${process.env.PORT}"`);
  }
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
