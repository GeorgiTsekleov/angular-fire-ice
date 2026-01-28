import express from "express";
import "dotenv/config";

const app = express();
const port = Number(process.env.PORT) || 8080;

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${process.env.PORT}"`);
}

app.use((req, res, next) => {
  const origin = process.env.CLIENT_URL || "http://localhost:4200";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello from Express server!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
