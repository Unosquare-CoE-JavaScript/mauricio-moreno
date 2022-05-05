// Public ################################
const calculator = (
	currentNumber = 0,
	currentOperation = '+',
	returnedValue = false,
) => {
	const calculator = value => {
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
	};
	const plus = () => calculator('+');
	const minus = () => calculator('-');
	const mult = () => calculator('*');
	const div = () => calculator('/');
	const eq = () => calculator('=');
	const number = value => calculator(value);

	const publicApi = {
		calculator,
		plus,
		minus,
		mult,
		div,
		eq,
		number,
	};

	return publicApi;
};

// Private ####################################

function useCalc(calc, keys) {
	var keyMappings = {
		'+': 'plus',
		'-': 'minus',
		'*': 'mult',
		'/': 'div',
		'=': 'eq',
	};
	return [...keys].reduce(function showDisplay(display, key) {
		var fn = keyMappings[key] || 'number';
		var ret = String(calc[fn](key));
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

// const calc = calculator();

// console.log(useCalc(calc, '4+3='));
// console.log(useCalc(calc, '+9='));
// console.log(useCalc(calc, '*8='));
// console.log(useCalc(calc, '7*2*3='));
// console.log(useCalc(calc, '1/0='));

// alternate usage ==========================

const calc = calculator();

const useCalculator = (
	calc => value =>
		useCalc(calc, value)
)(calc);

module.exports = {
	calculator,
	useCalc,
	useCalculator,
};
