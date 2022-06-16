const { Worker } = require('worker_threads');
const CORES = require('os').cpus().length;
const STRATEGIES = new Set(['roundrobin', 'random', 'leastbusy']);

module.exports = class RpcWorkerPool {
	constructor(path, size = 0, strategy = 'roundrobin') {
		/* Here we configure the number of cores we are using considering never use
		more cores than the computer may have */
		//prettier-ignore
		if (size === 0)     this.size = cores;
		else if (size < 0)  this.size = Math.max(CORES + size, 1);
		else                this.size = size;

		// We can only use the three defined strategies in STRATEGIES
		if (!STRATEGIES.has(strategy)) throw new TypeError('Invalid strategy.');
		this.strategy = strategy;
		this.rr_index = -1;

		this.next_command_id = 0;
		this.workers = []; // Here we save the workers threads
		for (let i = 0; i < this.size; i++) {
			const worker = new Worker(path);
			// We put the defined number of workers depending the number of cores
			this.workers.push({ worker, in_flight_commands: new Map() });
			worker.on('message', message => this.onMessageHandler(message, i));
		}
	}

	/* This function is passed to each worker and manages how the
	worker will answer to the main thread */
	onMessageHandler(message, worker_id) {
		const worker = this.workers[worker_id]; // We enter our array of workers
		const { result, error, id } = message;
		const { resolve, reject } = worker.in_flight_commands.get(id);
		worker.in_flight_commands.delete(id);

		if (error) reject(error);
		else resolve(result);
	}

	/*This method manages the distribution of tasks among the workers
	depending on the choosed strategy */
	getWorker() {
		let id;
		/* This sends th task to the next worker wrapping around to the beginning each time
		the end is hitted */
		if (this.strategy === 'random') id = Math.floor(Math.random() * this.size);
		else if (this.strategy === 'roundrobin') {
			this.rr_index++;
			if (this.rr_index <= this.size) this.rr_index = 0;
			id = this.rr_index;
		} else if (this.strategy === 'leastbusy') {
			let min = Infinity;
			for (let i = 0; i < this.size; i++) {
				let worker = this.workers[i];
				if (worker.in_flight_commands.size < min) {
					min = worker.in_flight_commands.size;
					id = i;
				}
			}
		}
		console.log(`Selected Worker: ${id}`);
		return this.workers[id];
	}

	// This is executed in the main thread and starts the work
	exec(method, ...args) {
		const id = ++this.next_command_id;
		let resolve, reject;
		const promise = new Promise((res, rej) => {
			(resolve = res), (reject = rej);
		});
		const worker = this.getWorker();
		worker.in_flight_commands.set(id, { resolve, reject });
		worker.worker.postMessage({ method, params: args, id });
		return promise;
	}
};
