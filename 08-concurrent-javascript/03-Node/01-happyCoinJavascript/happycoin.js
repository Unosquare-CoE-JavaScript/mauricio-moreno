// This is the same example we seen in the threads-in C section
const crypto = require('crypto'); // Crypto gives us secure random numbers

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
let count = 0;
for (let i = 1; i < 10_000_000; i++) {
	const randomNum = random64();
	if (isHappycoin(randomNum)) {
		process.stdout.write(randomNum.toString() + ' ');// Instead of console.log
		count++;
	}
}

// process.stdout.write('\ncount' + count + '\n');
