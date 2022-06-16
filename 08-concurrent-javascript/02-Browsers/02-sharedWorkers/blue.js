console.log('blue.js');

const worker = new SharedWorker('shared-worker.js');

worker.port.onmessage = event => console.log('EVENT', event.data);

// This is the way to send data to the worker
// worker.port.postMessage('Hello World!');
