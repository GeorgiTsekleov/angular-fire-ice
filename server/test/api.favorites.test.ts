import request from "supertest";
import { createApp } from "../src/index";
import { InMemoryUserRepository } from "../src/auth/in-memory-user.repository";
import { InMemoryFavoritesRepository } from "../src/favorites/in-memory-favorites.repository";

describe("Favorites API", () => {
  let testApp: ReturnType<typeof createApp>;
  let agent: ReturnType<typeof request.agent>;
  const testUser = {
    email: "favorites@example.com",
    password: "password123",
    name: "Favorites User",
  };

  beforeEach(async () => {
    const userRepo = new InMemoryUserRepository();
    testApp = createApp(undefined, userRepo);
    await request(testApp)
      .post("/api/auth/register")
      .send(testUser)
      .expect(201);
    agent = request.agent(testApp);
    await agent
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password })
      .expect(200);
  });

  describe("GET /api/favorites", () => {
    it("should return 401 when not authenticated", async () => {
      await request(testApp).get("/api/favorites").expect(401);
    });

    it("should return empty list initially", async () => {
      const res = await agent.get("/api/favorites").expect(200);
      expect(res.body).toEqual({ favoriteBookIds: [] });
    });
  });

  describe("POST /api/favorites", () => {
    it("should add a book ID and return updated list", async () => {
      const res = await agent
        .post("/api/favorites")
        .send({ bookId: "https://api.example.com/books/1" })
        .expect(200);

      expect(res.body.favoriteBookIds).toEqual([
        "https://api.example.com/books/1",
      ]);
    });

    it("should accumulate favorites", async () => {
      await agent
        .post("/api/favorites")
        .send({ bookId: "https://api.example.com/books/1" })
        .expect(200);
      await agent
        .post("/api/favorites")
        .send({ bookId: "https://api.example.com/books/2" })
        .expect(200);
      const res = await agent
        .post("/api/favorites")
        .send({ bookId: "https://api.example.com/books/3" })
        .expect(200);

      expect(res.body.favoriteBookIds).toEqual([
        "https://api.example.com/books/1",
        "https://api.example.com/books/2",
        "https://api.example.com/books/3",
      ]);
    });

    it("should not duplicate when adding same bookId again", async () => {
      await agent.post("/api/favorites").send({ bookId: "id-2" });

      const res = await agent
        .post("/api/favorites")
        .send({ bookId: "id-2" })
        .expect(200);

      expect(res.body.favoriteBookIds).toEqual(["id-2"]);
    });

    it("should return 400 when bookId is missing or invalid", async () => {
      const res = await agent.post("/api/favorites").send({}).expect(400);

      expect(res.body).toHaveProperty("favoriteBookIds");
      expect(Array.isArray(res.body.favoriteBookIds)).toBe(true);
    });
  });

  it("should update favorites across logout and re-login", async () => {
    const book1 = "https://api.example.com/books/1";
    const book2 = "https://api.example.com/books/2";

    await agent.post("/api/favorites").send({ bookId: book1 }).expect(200);

    await agent.post("/api/auth/logout").expect(204);

    await agent
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password })
      .expect(200);

    const getAfterReLogin = await agent.get("/api/favorites").expect(200);
    expect(getAfterReLogin.body.favoriteBookIds).toEqual([book1]);

    const addSecond = await agent
      .post("/api/favorites")
      .send({ bookId: book2 })
      .expect(200);
    expect(addSecond.body.favoriteBookIds).toEqual([book1, book2]);
  });

  describe("DELETE /api/favorites/:bookId", () => {
    it("should remove a book ID and return updated list", async () => {
      await agent.post("/api/favorites").send({ bookId: "to-remove" });

      const res = await agent.delete("/api/favorites/to-remove").expect(200);

      expect(res.body.favoriteBookIds).not.toContain("to-remove");
    });

    it("should handle encoded bookId in URL", async () => {
      const bookId = "https://api.example.com/books/42";
      await agent.post("/api/favorites").send({ bookId });

      const res = await agent
        .delete(`/api/favorites/${encodeURIComponent(bookId)}`)
        .expect(200);

      expect(res.body.favoriteBookIds).not.toContain(bookId);
    });
  });
});

describe("InMemoryFavoritesRepository", () => {
  it("reset() clears the store", () => {
    const repo = new InMemoryFavoritesRepository();
    repo.add("id-1");
    repo.add("id-2");
    expect(repo.getAll()).toEqual(["id-1", "id-2"]);

    repo.reset();
    expect(repo.getAll()).toEqual([]);
  });
});
