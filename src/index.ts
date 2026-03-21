import express from "express";

const app = express();
const port = parseInt(process.env.APP_PORT || "3000", 10);

app.get("/hello", (req, res) => {
  const name = typeof req.query.name === "string" ? req.query.name : "World";
  res.json({ message: `Hello, ${name}!` });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Onboarding app listening on port ${port}`);
});
