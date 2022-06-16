const Piscina = require('piscina');

if (!Piscina.isWorkerThread) {
	const piscina = new Piscina({ filename: __filename });
	//? Runs the thread with the number 9
	piscina
		.run(9)
		.then(squareRootOfNine =>
			console.log(`The square root of nine is: ${squareRootOfNine}`),
		);
}

//? This is the task of the thread
module.exports = num => Math.sqrt(num);
