import type { RegisterBody } from "@angular-fire-ice/shared";

const MIN_PASSWORD_LENGTH = 6;

export function getRegisterError(body: RegisterBody): string | null {
  if (body === null || typeof body !== "object")
    return "Body must be an object";

  const { email, password, name } = body;

  if (typeof email !== "string" || !email.trim()) return "Email is required";
  if (typeof password !== "string") return "Password is required";
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }
  if (name !== undefined && typeof name !== "string")
    return "Name must be a string";

  return null;
}
