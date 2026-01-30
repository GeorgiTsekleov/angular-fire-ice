import type { Request, Response } from "express";
import { Session } from "express-session";

export function logout(
  req: Request & { session: Session },
  res: Response,
): void {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ success: false, error: "Logout failed" });
      return;
    }
    res.status(204).send();
    console.log("logout success");
  });
}
