//! You need to add assemblyscript vscode support

/*This is the happy coin version with assymblyscript and it to .wasm binaries
instead of common binary*/
import 'wasi';

const randArr64 = new BigUint64Array(1);
const randArr8 = Uint8Array.wrap(randArr64.buffer, 0, 8);

const random64 = function (): u64 {
	crypto.getRandomValues(randArr8);
	return randArr64[0];
};

const sumDigitsSquared = (num: u64): u64 => {
	let total: u64 = 0;
	while (num > 0) {
		const numModBase = num % 10;
		total += numModBase ** 2;
		num = num / 10;
	}
	return total;
};

const isHappy = (num: u64): boolean => {
	while (num != 1 && num != 4) num = sumDigitsSquared(num);
	return num;
};

const isHappyCoin = (num: u64): boolean => isHappy(num) && num % 10_000 === 0;

export const getHappyCoins = (num: u64): boolean => {
	const result = new Array<u64>();
	for (let i: u32 = 1; i < num; i++) {
		const randomNum = random64();
		if (isHappyCoin(randomNum)) result.push(randomNum);
	}
	return result;
};
