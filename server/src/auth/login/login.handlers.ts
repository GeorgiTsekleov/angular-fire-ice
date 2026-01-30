import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ApiResponse, LoginBody, UserDto } from "@angular-fire-ice/shared";
import type { UserRepository } from "../types";
import { getLoginError } from "./validation";
import { FavoritesRepository } from "../../favorites/types";
import { mergeUniqueIds } from "../../utils/array";

export async function login(
  req: Request,
  res: Response,
  repository: UserRepository,
  favoritesRepository: FavoritesRepository,
): Promise<void> {
  const err = getLoginError(req.body);
  if (err) {
    res.status(400).json({ success: false, error: err });
    return;
  }

  const { email, password } = req.body as LoginBody;
  const emailTrimmed = email.trim().toLowerCase();

  const user = repository.findByEmail(emailTrimmed);
  if (!user) {
    res
      .status(401)
      .json({ success: false, error: "Invalid email or password" });
    return;
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    res
      .status(401)
      .json({ success: false, error: "Invalid email or password" });
    return;
  }

  const currentFavorites = favoritesRepository.getAll();
  const userFavorites = user.favorites ?? [];
  const mergedFavorites = mergeUniqueIds(currentFavorites, userFavorites);

  (req.session as { userId?: string }).userId = user.id;
  const body: ApiResponse<UserDto> = {
    success: true,
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      favorites: mergedFavorites,
    },
  };
  res.status(200).json(body);
  console.log("login success", body);
  favoritesRepository.reset();
}
