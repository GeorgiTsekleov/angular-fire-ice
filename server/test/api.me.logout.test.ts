import request from "supertest";
import { createApp } from "../src/index";
import { InMemoryUserRepository } from "../src/auth/in-memory-user.repository";

describe("Auth API - Me", () => {
  const testUser = {
    email: "me@example.com",
    password: "password123",
    name: "Me User",
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

  it("should return 401 when not authenticated", async () => {
    const res = await request(testApp).get("/api/auth/me").expect(401);

    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain("Not authenticated");
  });

  it("should return 200 with user data when authenticated", async () => {
    const agent = request.agent(testApp);
    await agent
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password })
      .expect(200);

    const res = await agent.get("/api/auth/me").expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data).toMatchObject({
      email: testUser.email,
      name: testUser.name,
    });
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data).toHaveProperty("favorites");
    expect(Array.isArray(res.body.data.favorites)).toBe(true);
  });
});

describe("Auth API - Logout", () => {
  const testUser = {
    email: "logout@example.com",
    password: "password123",
    name: "Logout User",
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

  it("should return 204 and destroy session", async () => {
    const agent = request.agent(testApp);
    await agent
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password })
      .expect(200);

    await agent.post("/api/auth/logout").expect(204);

    await agent.get("/api/auth/me").expect(401);
  });

  it("should return 204 when no session", async () => {
    await request(testApp).post("/api/auth/logout").expect(204);
  });
});
