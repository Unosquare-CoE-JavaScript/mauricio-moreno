const { Worker } = require('worker_threads');

const worker = new Worker(`${__dirname}/worker.js`);

const length = 10;

// We define the size of the sharedArray
const size = Int32Array.BYTES_PER_ELEMENT * length;

const sharedBuffer = new SharedArrayBuffer(size);
const sharedArray = new Int32Array(sharedBuffer);

// We can change the data of the shared array in this way
for (let i = 0; i < 10; i++) {
	Atomics.store(sharedArray, i, 0);
}

worker.postMessage(sharedBuffer);
