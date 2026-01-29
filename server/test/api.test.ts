import request from "supertest";
import { app, createApp } from "../src/index";
import { InMemoryFavoritesRepository } from "../src/favorites/in-memory-favorites.repository";

describe("GET /api/test-user", () => {
  it("should return a User with success true", async () => {
    const res = await request(app).get("/api/test-user").expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data).toHaveProperty("email");
    expect(res.body.data).toHaveProperty("name");
    expect(res.body.data.email).toBe("test@example.com");
  });
});

describe("Favorites API", () => {
  let testApp: ReturnType<typeof createApp>;

  beforeEach(() => {
    testApp = createApp(new InMemoryFavoritesRepository());
  });

  describe("GET /api/favorites", () => {
    it("should return empty list initially", async () => {
      const res = await request(testApp).get("/api/favorites").expect(200);

      expect(res.body).toEqual({ favoriteBookIds: [] });
    });
  });

  describe("POST /api/favorites", () => {
    it("should add a book ID and return updated list", async () => {
      const res = await request(testApp)
        .post("/api/favorites")
        .send({ bookId: "https://api.example.com/books/1" })
        .expect(200);

      expect(res.body.favoriteBookIds).toEqual([
        "https://api.example.com/books/1",
      ]);
    });

    it("should not duplicate when adding same bookId again", async () => {
      await request(testApp).post("/api/favorites").send({ bookId: "id-2" });

      const res = await request(testApp)
        .post("/api/favorites")
        .send({ bookId: "id-2" })
        .expect(200);

      expect(res.body.favoriteBookIds).toEqual(["id-2"]);
    });

    it("should return 400 when bookId is missing or invalid", async () => {
      const res = await request(testApp)
        .post("/api/favorites")
        .send({})
        .expect(400);

      expect(res.body).toHaveProperty("favoriteBookIds");
      expect(Array.isArray(res.body.favoriteBookIds)).toBe(true);
    });
  });

  describe("DELETE /api/favorites/:bookId", () => {
    it("should remove a book ID and return updated list", async () => {
      await request(testApp)
        .post("/api/favorites")
        .send({ bookId: "to-remove" });

      const res = await request(testApp)
        .delete("/api/favorites/to-remove")
        .expect(200);

      expect(res.body.favoriteBookIds).not.toContain("to-remove");
    });

    it("should handle encoded bookId in URL", async () => {
      const bookId = "https://api.example.com/books/42";
      await request(testApp).post("/api/favorites").send({ bookId });

      const res = await request(testApp)
        .delete(`/api/favorites/${encodeURIComponent(bookId)}`)
        .expect(200);

      expect(res.body.favoriteBookIds).not.toContain(bookId);
    });
  });
});
