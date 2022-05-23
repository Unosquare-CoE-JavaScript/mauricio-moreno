// simple function
const add = ([x, y]) => x + y;

// A function that receives undefined number of parameters and sums every number in these parameters
const addMultiple = (...numbers) =>
	numbers.reduce((previous, current) => previous + current);

// A simple curry function
const toPair =
	f =>
	([x, y]) =>
		f([x, y]);

// A curry function that receives undefined number of parameters and pases it to a function
// That also receives an undefined number of parameters
const multipleCurry =
	f =>
	(...args) =>
		f(...args);

const result1 = toPair(add)([1, 2]);
const result2 = multipleCurry(addMultiple)(1, 2, 3, 4, 5);

console.log(result);
console.log(result2);
