var shadowedVariable = 'first value';
// (1) First Scope
const scopesFunction = (function firstScope() {
	// (2) Second Scope
	var cache = [];

	return function secondScope(shadowedVariable = 'second value') {
		//(3) Third Scope
		let response = [];

		{
			//(4) First Block
			let addition = shadowedVariable
				.split('')
				.map(function replaceLetterE(element) {
					// (5) Fourth Scope
					if (element === 'e') return 'a';
					else return element;
				})
				.join('');
			response.push(addition);
		}

		{
			//(4) Second Block
			let addition = shadowedVariable
				.split('')
				.filter(function filterLetterN(element) {
					// (5) Fifth Scope
					return !(element === 'n');
				})
				.join('');
			response.push(addition);
		}

		cache.push(response);
		return response;
	};
})();

//! Prime and factorizations

const isPrime = (
	(cache = []) =>
	value => {
		if (value <= 3) return value > 1;
		if (value % 2 == 0 || value % 3 == 0) return false;

		if (cache.includes(value)) return true;

		var valueSquareRoot = Math.sqrt(value);
		for (let i = 5; i <= valueSquareRoot; i += 6)
			if (value % i == 0 || value % (i + 2) == 0) return false;

		cache.push(value);
		return true;
	}
)();

const factorize = value => {
	if (!isPrime(value)) {
		let i = Math.floor(Math.sqrt(value));
		while (v % i != 0) {
			i--;
		}
		return [...factorize(i), ...factorize(v / i)];
	}
	return [value];
};

// Toggler

const toggle = (...values) => {
	let step = 0;
	const valueArray = [...values];
	return () => valueArray[step++ % valueArray.length];
};

let speedToggler = toggle('slow', 'medium', 'fast');

console.log(speedToggler());
console.log(speedToggler());
console.log(speedToggler());
console.log(speedToggler());

//! Calculadora

// Public ################################
const calc = (
	(currentNumber = 0, currentOperation = '+', returnedValue = false) =>
	value => {
		const operators = ['+', '-', '*', '/'];

		if (operators.includes(value)) {
			currentOperation = value;
			if (returnedValue) returnedValue = false;
			return value;
		}
		if (value == '=') {
			returnedValue = true;
			return formatTotal(currentNumber);
		}
		// ReStarts the calculator if the value is returned and the first input is number
		if (/[0-9]/.test(value) && returnedValue) {
			returnedValue = false;
			currentNumber = value;
			return value;
		}

		switch (currentOperation) {
			case '+': {
				currentNumber = currentNumber + Number(value);
				break;
			}
			case '-': {
				currentNumber = currentNumber - Number(value);
				break;
			}
			case '*': {
				currentNumber = currentNumber * Number(value);
				break;
			}
			case '/': {
				currentNumber = currentNumber / Number(value);
				break;
			}
		}
		return value;
	}
)();

// Private ##################
function useCalc(calc, keys) {
	return [...keys].reduce(function showDisplay(display, key) {
		var ret = String(calc(key));
		return display + (ret != '' && key == '=' ? '=' : '') + ret;
	}, '');
}
function formatTotal(display) {
	if (Number.isFinite(display)) {
		// constrain display to max 11 chars
		let maxDigits = 11;
		// reserve space for "e+" notation?
		if (Math.abs(display) > 99999999999) {
			maxDigits -= 6;
		}
		// reserve space for "-"?
		if (display < 0) {
			maxDigits--;
		}
		// whole number?
		if (Number.isInteger(display)) {
			display = display.toPrecision(maxDigits).replace(/\.0+$/, '');
		}
		// decimal
		else {
			// reserve space for "."
			maxDigits--;
			// reserve space for leading "0"?
			if (Math.abs(display) >= 0 && Math.abs(display) < 1) {
				maxDigits--;
			}
			display = display.toPrecision(maxDigits).replace(/0+$/, '');
		}
	} else {
		display = 'ERR';
	}
	return display;
}