const {
	Worker,
	isMainThread,
	MessageChannel,
	workerData,
} = require('worker_threads');

if (isMainThread) {
	const { port1, port2 } = new MessageChannel();
	// We made available this worker for the other threads
	const worker = new Worker(__filename, {
		workerData: {
			port: port2,
		},
		transferList: [port2],
	});
	port1.on('message', message => port1.postMessage(message));
} else {
	// We can receive the worker data for the created worker before
	const { port } = workerData;
	port.on('message', message =>
		console.log(`We got a message from the main thread: ${message}`),
	);
	port.postMessage('Hello world!');
}
