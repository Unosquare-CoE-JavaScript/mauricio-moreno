const { Worker, isMainThread, workerData } = require('worker_threads');
const assert = require('assert');

if (isMainThread) {
	/* rather than using a separate file for the worker thread, we can use current
	file with __filename and switch the behavior based on isMainThread */
	const worker = new Worker(__filename, { workerData: { num: 42 } }); // We refer to this file
} else assert.strictEqual(workerData.num, 42);
