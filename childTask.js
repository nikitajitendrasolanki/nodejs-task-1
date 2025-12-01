const { parentPort } = require("worker_threads");

function heavyCalculation() {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        sum += i;
    }
    return sum;
}

parentPort.postMessage(heavyCalculation());
