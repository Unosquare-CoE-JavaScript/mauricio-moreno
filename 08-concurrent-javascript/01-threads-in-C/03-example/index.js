const fs = require('fs');

const getNumber = async filename =>
	parseInt(await fs.readFile(filename, { encoding: 'utf-8' }), 10);

(async () => {
	try {
		const numberPromises = [1, 2, 3].map(number =>
			getNumber(`./${number}.txt`),
		);
		const numbers = await Promise.all(numberPromises);
		console.log(numbers[0] + numbers[1] + numbers[2]);
	} catch (error) {
		console.error('Something went wrong:');
		console.error(error);
	}
})();

/* Since we’re using Promise.all(), we’re waiting for allthree files to be read and parsed.*/
/*There’s still only one instruction pointer, andonly one instruction is being executed at a time.*/
