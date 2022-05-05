const counter =
	(step = 1, count = 0) =>
	() => {
		count = count + step;
		return count;
	};

const thisFunction = counter(1, 0);
console.log(thisFunction());
console.log(thisFunction());
console.log(thisFunction());

const mensaje = (tipo, estilos) => string =>
	console.log(`%c ${tipo}: ${string}`, estilos);

const error = mensaje('Error', 'background: red; color: white;');
const warn = mensaje('Warning', 'background: orange; color: white;');

var factorial = (
	(cache = {}) =>
	x => {
		if (x < 2) return 1;
		if (!(x in cache)) cache[x] = x * factorial(x - 1);
		return cache[x];
	}
)();

console.log(factorial(6));
// 720
console.log(factorial(7));
// 5040
