// Curry of ramda, allows you to create currys with an undefined number of parameters
// And the code will run once the parameters are filled
const { curry } = require('ramda');

// For example this function receives a regex a replacement string and a string as parameter
// if it were a simple function you'll need only one call to make it works but with curry from ramda
// you can create dinamic functions each time you add a parameter
const replace = curry((regex: RegExp, replacement: string, str: string) =>
	str.replace(regex, replacement),
);

//first call with 2/3 parameters
const replaceVowels = replace(/[AEIOU]/gi, '!');

// Second call with the last parameter
const result = replaceVowels('Hey I have words');

console.log(result);

//! Another example from ramda

const addFourNumbers = (a: number, b: number, c: number, d: number) =>
	a + b + c + d;

const curriedAddFourNumbers = curry(addFourNumbers);
const f = curriedAddFourNumbers(1, 2);
const g = f(3);
g(4); //=> 10
