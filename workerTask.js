const http = require("http");
const { Worker } = require("worker_threads");

const server = http.createServer((req, res) => {

    if (req.url === "/heavy") {
        const worker = new Worker("./childTask.js");

        worker.on("message", (result) => {
            res.writeHead(200);
            res.end(`Heavy Task Result: ${result}`);
        });

        worker.on("error", (err) => {
            res.writeHead(500);
            res.end("Worker error:", err);
        });

    } else {
        res.writeHead(200);
        res.end("Hello from Worker " + process.pid);
    }
});

server.listen(3000, () => {
    console.log(`Worker ${process.pid} running on port 3000`);
});
