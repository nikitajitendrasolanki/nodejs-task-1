const express = require("express");
const { Worker } = require("worker_threads");
const redis = require("redis");

const app = express();

// Redis client
const client = redis.createClient({ url: "redis://localhost:6379" }); // existing Redis
client.connect();
client.on("error", (err) => console.log("Redis Client Error", err));

// /heavy endpoint with Redis caching
app.get("/heavy", async (req, res) => {
    const cacheKey = "heavyResult";

    try {
        // 1️⃣ Check if result is in Redis
        const cached = await client.get(cacheKey);
        if (cached) {
            return res.json({ result: Number(cached), source: "cache" });
        }

        // 2️⃣ If not in cache, run heavy task in Worker Thread
        const worker = new Worker("./childTask.js");
        worker.on("message", async (result) => {
            // Save result in Redis for 1 hour
            await client.set(cacheKey, result, { EX: 3600 });
            res.json({ result, source: "calculation" });
        });

        worker.on("error", (err) => {
            res.status(500).json({ error: err.message });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Light endpoint
app.get("/", (req, res) => {
    res.send(`Hello from server ${process.pid}`);
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
