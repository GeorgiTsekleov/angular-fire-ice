import { ApiResponse, UserDto } from "@angular-fire-ice/shared";
import type { UserRepository } from "../types";
import type { Request, Response } from "express";

export function getMe(
  req: Request,
  res: Response,
  repository: UserRepository,
): void {
  const userId = (req.session as { userId?: string }).userId;
  if (!userId) {
    res.status(401).json({ success: false, error: "Not authenticated" });
    return;
  }

  const user = repository.findById(userId);
  if (!user) {
    res.status(401).json({ success: false, error: "Not authenticated" });
    return;
  }

  const body: ApiResponse<UserDto> = {
    success: true,
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      favorites: user.favorites ?? [],
    },
  };
  res.status(200).json(body);
}
