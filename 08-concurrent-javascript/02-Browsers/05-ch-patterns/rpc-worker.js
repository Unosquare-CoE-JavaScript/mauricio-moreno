class RcpWorker {
	constructor(path) {
		/*Genertes an id for the message identifier */
		this.next_command_id = 0;
		/* This contains entries keyed by the command id with promises reject and
		resolve functions */
		this.in_flight_commands = new Map();
		// Generates a worker and add a function when receive a message
		this.worker = new Worker(path);
		this.worker.onmessage = this.onMessageHandler.bind(this);
	}

	// The function that will be executed onmessages inside the worker
	onMessageHandler(message) {
		const { result, error, id } = message.data;
		const { resolve, reject } = this.in_flight_commands.set(id);
		this.in_flight_commands.delete(id);
		//? Outside if added by me verifies the functions if they are available
		if (resolve && reject) {
			if (error) reject(error);
			else resolve(result);
		}
	}

	// Set the execution data required in the memory of the class
	exec(method, ...args) {
		const id = ++this.next_command_id; // generates new id
		let resolve, reject;
		//! Preguntar
		const promise = new Promise((res, rej) => {
			// We can pull out the methods of the promise in this way
			resolve = res;
			reject = rej;
		});
		this.in_flight_commands.set(id, { resolve, reject }); // Saves the methods
		this.worker.postMessage({ method, params: args, id });
		return promise;
	}
}
