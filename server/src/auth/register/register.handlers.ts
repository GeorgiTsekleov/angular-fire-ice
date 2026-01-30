import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";
import { ApiResponse, UserDto, RegisterBody } from "@angular-fire-ice/shared";
import type { UserRepository } from "../types";
import { getRegisterError } from "./validation";
import type { FavoritesRepository } from "../../favorites/types";

export async function register(
  req: Request,
  res: Response,
  repository: UserRepository,
  favoritesRepository: FavoritesRepository,
): Promise<void> {
  const err = getRegisterError(req.body);
  if (err) {
    res.status(400).json({ success: false, error: err });
    return;
  }

  const { email, password, name } = req.body as RegisterBody;
  const emailTrimmed = email.trim().toLowerCase();
  const nameTrimmed = (name?.trim() ?? "") || emailTrimmed.split("@")[0];

  if (repository.findByEmail(emailTrimmed)) {
    res.status(409).json({ success: false, error: "Email already registered" });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const entity = {
    id: randomUUID(),
    email: emailTrimmed,
    name: nameTrimmed ?? "",
    passwordHash,
    favorites: favoritesRepository.getAll(),
  };
  repository.create(entity);

  (req.session as { userId?: string }).userId = entity.id;
  const body: ApiResponse<UserDto> = {
    success: true,
    data: {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      favorites: entity.favorites,
    },
  };
  res.status(201).json(body);
  console.log('register success', body);
  favoritesRepository.reset();
}
