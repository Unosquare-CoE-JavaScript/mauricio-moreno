// Ramdom string for debuging
const ID = Math.floor(Math.random() * 999999);
console.log('shared-worker.js', ID);

// Singleton list of ports
const ports = new Set();

// Receives the datta
self.onconnect = event => {
	const port = event.ports[0];
	ports.add(port);
	console.log('CONN', ID, ports.size);

	// Callback when new message is received
	port.onmessage = event => {
		console.log('MESSAGE', ID, event.data);

		// Messages are dispatched to the window
		for (const port of ports) {
			port.postMessage([ID, event.data]);
		}
	};
};
