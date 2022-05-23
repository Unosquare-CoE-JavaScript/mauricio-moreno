//! Repasar más

class Integer {
	constructor(value) {
		this.value = value;
	}
}

let Operation = Object.freeze({
	addition: 0,
	subtraction: 1,
});

class BinaryOperation {
	constructor() {
		this.type = null;
		this.left = null;
		this.right = null;
	}

	get value() {
		switch (this.type) {
			case Operation.addition:
				return this.left.value + this.right.value;
			case Operation.subtraction:
				return this.left.value - this.right.value;
		}
		return 0;
	}
}

let TokenType = Object.freeze({
	integer: 0,
	plus: 1,
	minus: 2,
	lparen: 3,
	rparen: 4,
});

class Token {
	constructor(type, text) {
		this.type = type;
		this.text = text;
	}

	toString() {
		return `\`${this.text}\``;
	}
}

// Lexing ==============================================================
// Separates the text content into tokens
var lex = input => {
	// This array will be filled with (objects: Token), with its type and value
	let result = [];

	for (let i = 0; i < input.length; ++i) {
		switch (input[i]) {
			// Operations --------
			case '+':
				result.push(new Token(TokenType.plus, '+'));
				break;
			case '-':
				result.push(new Token(TokenType.minus, '-'));
				break;
			case '(':
				result.push(new Token(TokenType.lparen, '('));
				break;
			case ')':
				result.push(new Token(TokenType.rparen, ')'));
				break;
			// Numbers ---------
			/* When a number appears this section will continue seeking for consequents
			numbers after the current element so for example in the case of find a number "1",
			it will continue seeking numbers until they end, in this case instead of receive
			only "1" it can receive "117", and join the buffer*/
			default:
				let buffer = [input[i]];
				for (let j = i + 1; j < input.length; ++j) {
					if ('0123456789'.includes(input[j])) {
						buffer.push(input[j]);
						++i;
					} else {
						result.push(new Token(TokenType.integer, buffer.join('')));
						break;
					}
				}
				break;
		}
	}

	return result;
};

var parse = tokens => {
	let result = new BinaryOperation();
	var haveLHS = false;

	for (let i = 0; i < tokens.length; ++i) {
		let token = tokens[i];

		switch (token.type) {
			case TokenType.integer:
				let integer = new Integer(parseInt(token.text));
				if (!haveLHS) {
					result.left = integer;
					haveLHS = true;
				} else result.right = integer;
				break;
			case TokenType.plus:
				result.type = Operation.addition;
				break;
			case TokenType.minus:
				result.type = Operation.subtraction;
				break;
			case TokenType.lparen:
				let j = i;

				for (; j < tokens.length; ++j)
					if (tokens[j].type === TokenType.rparen) break; // found it!

				// process subexpression
				let subexpression = tokens.slice(i + 1, j);
				let element = parse(subexpression);

				if (!haveLHS) {
					result.left = element;
					haveLHS = true;
				} else result.right = element;
				i = j; // advance
				break;
		}
	}

	return result;
};

const input = '(13+4)-(12+1)';
var tokens = lex(input);
console.log(tokens.join('  '));

var parsed = parse(tokens);
console.log(`${input} = ${parsed.value}`);
