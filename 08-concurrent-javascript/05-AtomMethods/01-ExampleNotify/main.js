if (!crossOriginIsolated) throw new Error('Cannot use SharedArrayBuffer.');

const buffer = new SharedArrayBuffer(4);
const now = Date.now();
const view = new Int32Array(buffer);

// We instantiate 4 workers
for (let i = 0; i < 4; i++) {
	const worker = new Worker('worker.js');
	worker.postMessage({ buffer, name: 1 });//Immediately notify the workers
	worker.onmessage = () => {
		console.log(`Ready; id=${i}, count=${--count}, time=${Date.now() - now}ms`);
		// Notify on the 0th entry once all four workers reply
		if (count === 0) {
			Atomics.notify(view, 0);
		}
	};
}

setTimeout(() => {
	// The shared buffer is notified at index 0
	Atomics.notify(view, 0, 3);
}, 500); // The notification is sended
