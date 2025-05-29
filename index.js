import express from "express";
import mongoose from "mongoose";
import { createClient } from "redis";
import "dotenv/config";

const app = express();
const port = 3000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Redis Connection
const client = createClient({ url: process.env.REDIS_URL });
client.on("error", (err) => console.log("Redis Client Error", err));
await client.connect();

app.get("/", async (req, res) => {
  res.send(`Hello from Node.js with MongoDB and Redis! I am Ki`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
