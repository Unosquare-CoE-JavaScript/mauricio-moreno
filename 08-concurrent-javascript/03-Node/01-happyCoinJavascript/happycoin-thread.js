// This is the same example we seen in the threads-in C section
const crypto = require('crypto'); // Crypto gives us secure random numbers
const { Worker, isMainThread, parentPort } = require('worker_threads');

const big64arr = new BigUint64Array(1);
const random64 = () => {
	crypto.randomFillSync(big64arr);
	return big64arr[0];
};

const sumDigitsSquared = (number, num = BigInt(number)) => {
	let total = 0n; // its a bigint primitive
	while (num > 0) {
		const numModBase = num % 10n;
		total += numModBase ** 2n;
		num = num / 10n;
	}
	return total;
};

const isHappy = (number, num = BigInt(number)) => {
	while (num !== 1n && num !== 4n) num = sumDigitsSquared(num);
	return num === 1n;
};

const isHappycoin = (number, num = BigInt(number)) =>
	isHappy(num) && num % 10000n === 0n;

// Happy coin mining loop
const THREAD_COUNT = 4;

if (isMainThread) {
	let inFlight = THREAD_COUNT;
	let count = 0;
	// Creates four workers that listen the message event
	for (let i = 0; i < THREAD_COUNT; i++) {
		const worker = new Worker(__filename);
		worker.on('message', message => {
			if (message === 'done') {
				if (--inFlight === 0) {
					process.stdout.write('\ncount' + count + '\n');
				}
			} else if (typeof message === 'bigint') {
				process.stdout.write(message.toString() + ' ');
				count++;
			}
		});
	}
} else {
	// This is similar to the implementation without threads
	for (let i = 1; i < 10_000_000 / THREAD_COUNT; i++) {
		const randomNum = random64(); // This thread generates random numbers
		if (isHappycoin(randomNum)) {
			// Also verifies the value of the coin
			parentPort.postMessage(randomNum);
		}
	}
	parentPort.postMessage('done');
}
