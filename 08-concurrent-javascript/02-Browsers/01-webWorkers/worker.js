console.log('Hello from worker.js');

self.onmessage = message => {
	console.log(`Message from main ${message.data}`);
	postMessage('message sent from worker');
};
