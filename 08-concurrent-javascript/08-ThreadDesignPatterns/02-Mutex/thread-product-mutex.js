const { Worker, isMainThread, workerData } = require('worker_threads');
const assert = require('assert');
const Mutex = require('./mutex');

if (isMainThread) {
	// We shared our array of binary as usual
	const shared = new SharedArrayBuffer(4 * 5);
	const sharedInts = new Int32Array(shared);
	sharedInts.set([2, 3, 5, 7]);
	for (let i = 0; i < 3; i++)
		new Worker(__filename, { workerData: { i, shared } });
} else {
	// Here we use our mutex in the defined worker
	const { i, shared } = workerData;
	const sharedInts = new Int32Array(shared);
	const assert = require('assert');
	const mutex = new Mutex(sharedInts, 4);

	mutex.exec(() => {
		const a = sharedInts[i];
		for (let j = 0; j < 1_000_000; j++);
		const b = sharedInts[3];
		sharedInts[3] = a * b;
		assert.strictEqual(sharedInts[3], a * b);
	});
}
