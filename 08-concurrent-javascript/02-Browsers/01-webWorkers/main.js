console.log('hello world from main.js');

const worker = new Worker('worker.js');
worker.onmessage = message =>
	console.log(`Message received from worker ${message.data}`);

worker.postMessage('Message sent to worker');
console.log('Hello from end of main.js');
