//old
/*
self.onmessage = ({ data: { buffer, name } }) => {
	const view = new Int32Array(buffer);
	console.log(`Worker ${name} started.`);
	const result = Atomics.wait(view, 0, 0, 1000);
	console.log(`Worker ${name} awoken with ${result}`);
};
*/

// New
self.onmessage = ({ data: { buffer, name } }) => {
	postMessage('ready');// Calls to the parent to signal readiness
	const view = new Int32Array(buffer);
	console.log(`Worker ${name} started.`);
	const result = Atomics.wait(view, 0, 0, 1000);
	console.log(`Worker ${name} awoken with ${result}`);
};
