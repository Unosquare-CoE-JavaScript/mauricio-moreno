class Token {
	constructor(value = 0) {
		this.value = value;
	}
}

class Memento {
	constructor(value) {
		this.tokens = value;
	}
}

class TokenMachine {
	constructor() {
		this.tokens = [];
		this.changes = [new Memento(this.tokens)];
		this.current = 0;
	}

	addTokenValue(value) {
		return this.addToken(new Token(value));
	}

	addToken(token) {
		this.tokens.push(token);
		this.changes.push([...this.tokens]);
		console.log(this.changes);
		this.current++;
		return this.tokens;
	}

	revert(m = 1) {
		if (m > this.current) return 'You can not return too much ';
		this.current = this.current - m;
		this.tokens = this.changes[this.current];
		return this.tokens;
	}

	getToken() {
		return this.tokens;
	}
}

const tokenMachine = new TokenMachine();

console.log(tokenMachine.addToken(1));
console.log(tokenMachine.addToken(2));
console.log(tokenMachine.addToken(3));

console.log(tokenMachine.revert(1));

// Response to the exercise ===========================================

class Token {
	constructor(value = 0) {
		this.value = value;
	}
}

class Memento {
	constructor() {
		this.tokens = [];
	}
}

class TokenMachine {
	constructor() {
		this.tokens = [];
	}

	addTokenValue(value) {
		return this.addToken(new Token(value));
	}

	addToken(token) {
		let memento = new Memento();

		this.tokens.push(token);
		memento.tokens = this.tokens.map(token => new Token(token.value));
		return memento;
	}

	revert(memento) {
		if (this.tokens.length > 0) {
			this.tokens = memento.tokens.map(token => new Token(token.value));
		} else {
			console.log("Can't revert!!");
		}
	}
}
