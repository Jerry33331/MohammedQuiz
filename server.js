const express = require("express");
const path = require("node:path");
const pool = require("./src/database");

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", async (_request, response) => {
  try {
    const result = await pool.query("SELECT $1::text AS status", ["ok"]);
    response.json({ status: result.rows[0].status, database: "connected" });
  } catch (error) {
    console.error("Database health check failed:", error.message);
    response.status(503).json({ status: "unavailable", database: "disconnected" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Mohammed Quiz is listening on port ${port}`);
});

function closeServer() {
  pool.end().finally(() => process.exit(0));
}

process.on("SIGTERM", closeServer);
process.on("SIGINT", closeServer);
