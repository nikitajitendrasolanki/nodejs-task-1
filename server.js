const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
    console.log(`Master process PID: ${process.pid}`);

    const numCPUs = os.cpus().length;

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died. Starting a new one...`);
        cluster.fork();
    });

} else {
    require("./workerTask");
}
