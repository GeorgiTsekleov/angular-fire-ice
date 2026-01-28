import request from "supertest";
import { app } from "../src/index";

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
