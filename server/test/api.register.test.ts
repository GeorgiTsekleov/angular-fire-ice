import request from "supertest";
import { createApp } from "../src/index";
import { InMemoryUserRepository } from "../src/auth/in-memory-user.repository";

describe("Auth API - Register", () => {
  let testApp: ReturnType<typeof createApp>;

  beforeEach(() => {
    testApp = createApp(undefined, new InMemoryUserRepository());
  });

  it("should register a user and return 201 with user data", async () => {
    const res = await request(testApp)
      .post("/api/auth/register")
      .send({
        email: "newuser@example.com",
        password: "password123",
        name: "New User",
      })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data).toMatchObject({
      email: "newuser@example.com",
      name: "New User",
    });
    expect(res.body.data).toHaveProperty("id");
    expect(typeof res.body.data.id).toBe("string");
    expect(res.body.data).not.toHaveProperty("passwordHash");
  });

  it("should return 400 when email is missing", async () => {
    const res = await request(testApp)
      .post("/api/auth/register")
      .send({ password: "password123" })
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain("Email");
  });

  it("should return 400 when password is too short", async () => {
    const res = await request(testApp)
      .post("/api/auth/register")
      .send({ email: "short@test.com", password: "12345" })
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain("Password");
  });

  it("should return 409 when email is already registered", async () => {
    const payload = {
      email: "dup@example.com",
      password: "password123",
      name: "First",
    };
    await request(testApp).post("/api/auth/register").send(payload).expect(201);

    const res = await request(testApp)
      .post("/api/auth/register")
      .send(payload)
      .expect(409);

    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain("already registered");
  });
});
