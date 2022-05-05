const { curry } = require('ramda');

const replace = curry((regex: RegExp, replacement: string, str: string) =>
	str.replace(regex, replacement),
);

const replaceVowels = replace(/[AEIOU]/gi, '!');

// Ramda allows you to pass al the arguments in different callings to the function
const result = replaceVowels('Hey I have words');

console.log(result);

//! Another example from ramda

const addFourNumbers = (a: number, b: number, c: number, d: number) =>
	a + b + c + d;

const curriedAddFourNumbers = curry(addFourNumbers);
const f = curriedAddFourNumbers(1, 2);
const g = f(3);
g(4); //=> 10
