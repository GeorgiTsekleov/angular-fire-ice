import request from "supertest";
import { createApp } from "../src/index";
import { InMemoryUserRepository } from "../src/auth/in-memory-user.repository";

describe("Auth API - Login", () => {
  const testUser = {
    email: "login@example.com",
    password: "password123",
    name: "Login User",
  };
  let testApp: ReturnType<typeof createApp>;

  beforeEach(async () => {
    const userRepo = new InMemoryUserRepository();
    testApp = createApp(undefined, userRepo);
    await request(testApp)
      .post("/api/auth/register")
      .send(testUser)
      .expect(201);
  });

  it("should login with valid credentials and return 200 with user data", async () => {
    const res = await request(testApp)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password })
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data).toMatchObject({
      email: testUser.email,
      name: testUser.name,
    });
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data).toHaveProperty("favorites");
    expect(Array.isArray(res.body.data.favorites)).toBe(true);
    expect(res.body.data).not.toHaveProperty("passwordHash");
  });

  it("should return 401 for wrong password", async () => {
    const res = await request(testApp)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: "wrongpassword" })
      .expect(401);

    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain("Invalid email or password");
  });

  it("should return 401 for unknown email", async () => {
    const res = await request(testApp)
      .post("/api/auth/login")
      .send({ email: "unknown@example.com", password: testUser.password })
      .expect(401);

    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain("Invalid email or password");
  });

  it("should return 400 when email is missing", async () => {
    const res = await request(testApp)
      .post("/api/auth/login")
      .send({ password: testUser.password })
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain("Email");
  });

  it("should return 400 when password is too short", async () => {
    const res = await request(testApp)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: "12345" })
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain("Password");
  });
});
