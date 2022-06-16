const Piscina = require('piscina');
const assert = require('assert');
const { once } = require('events');

if (!Piscina.isWorkerThread) {
	const piscina = new Piscina({
		filename: __filename,
		// Limits the queue size to the square of the number of threads that piscina is using
		maxQueue: 'auto',
	});
	(async () => {
		for (let i = 0; i < 10_000_000; i++) {
			// check if the queue is full
			if (piscina.queueSize === piscina.options.maxQueue) {
				// We then wait for the drain event before submitting any new tasks to the queues
				await once(piscina, 'drain');
			}
			piscina.run(i).then(squareRootOfI => {
				assert.ok(typeof squareRootOfI === 'number');
			});
		}
	})();
}

module.exports = number => Math.sqrt(number);
