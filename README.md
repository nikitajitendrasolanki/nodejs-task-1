# Node.js Cluster + Worker Threads + Redis Demo

## Overview
This project demonstrates a Node.js server using **Worker Threads** and **Cluster** to handle CPU-intensive tasks without blocking the main thread.  
Additionally, **Redis caching** is implemented to store heavy computation results and provide fast responses on subsequent requests.

---

## Features
- Node.js HTTP server
- Worker Threads for heavy tasks
- Cluster support to utilize multiple CPU cores
- Redis caching for `/heavy` endpoint
- Non-blocking server for concurrent requests

---

## Endpoints

### `/`
- Simple endpoint to check server is running
- Response: `Hello from server <process.pid>`

### `/heavy`
- Runs heavy computation (`1e9` sum)
- Uses Worker Threads
- Caches result in Redis for 1 hour
- Responses:
  - First request: `{ result: <number>, source: "calculation" }`
  - Subsequent requests: `{ result: <number>, source: "cache" }`

---

## Setup Instructions

1. Clone repo:

```bash
git clone https://github.com/nikitajitendrasolanki/nodejs-task-1.git
cd nodejs-task-1
```

2. Make sure Redis is running on localhost:6379:
```bash
redis-server
```

3. Run server:
```bash
node server.js
```

4. Test endpoints (Browser / Postman):
- http://localhost:3000/ → simple hello
- http://localhost:3000/heavy → heavy task + Redis caching

---

### Notes
- node_modules is ignored via .gitignore
- Redis stores calculation result under key: heavyResult
- Cache expires in 1 hour
