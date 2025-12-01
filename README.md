# Node.js Task 1

This repository contains a small Node.js demo to illustrate how to use Worker Threads (and optionally Cluster) to handle CPU‑intensive tasks without blocking the server.

## Endpoints
- `/` → simple hello response  
- `/heavy` → runs heavy computation in a worker thread and returns the result

## How to Run
```bash
git clone https://github.com/nikitajitendrasolanki/nodejs-task-1.git
cd nodejs-task-1
npm install  # if you have dependencies
node server.js
```

Then open in browser:  
- `http://localhost:3000/`  
- `http://localhost:3000/heavy`
