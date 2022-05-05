const add = ([x, y]) => x + y;

const addMultiple = (...numbers) =>
	numbers.reduce((previous, current) => previous + current);

const toPair =
	f =>
	([x, y]) =>
		f([x, y]);

const multipleCurry =
	f =>
	(...args) =>
		f(...args);

const result1 = toPair(add)([1, 2]);
const result2 = multipleCurry(addMultiple)(1, 2, 3, 4, 5);

console.log(result);
console.log(result2);
