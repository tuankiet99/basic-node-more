import express from "express";
import mongoose from "mongoose";
import { createClient } from "redis";

const app = express();
const port = 3000;

// MongoDB Connection
mongoose
  .connect("mongodb://mongo:27017/basic-database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Redis Connection
const client = createClient({ url: "redis://redis:6379" });
client.on("error", (err) => console.log("Redis Client Error", err));
await client.connect();

app.get("/", async (req, res) => {
  res.send(`Hello from Node.js with MongoDB and Redis! I am Ki`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
