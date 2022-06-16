// This file will overload with threads the file and throw an error
// => Reached heap limit allocation failed
const Piscina = require('piscina');
const assert = require('assert');

if (!Piscina.isWorkerThread) {
	const piscina = new Piscina({ filename: __filename });
	for (let i = 0; i < 10_000_000; i++) {
		piscina.run(i).then(squareRootOfI => {
			assert.ok(typeof squareRootOfI === 'number');
		});
	}
}

module.exports = number => Math.sqrt(number);
