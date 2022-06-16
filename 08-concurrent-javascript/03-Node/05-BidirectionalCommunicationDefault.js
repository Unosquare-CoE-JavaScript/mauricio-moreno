const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
	const worker = new Worker(__filename); // We refer to this file
	worker.on('message', message => {
		worker.postMessage(message);
	});
} else {
	parentPort.on('message', message =>
	//? No sería desde un thread secundario?
		console.log('We got a message from the main thread: ', message),
	);
	parentPort.postMessage('Hello, World!');
}
