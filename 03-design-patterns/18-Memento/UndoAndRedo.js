class Memento {
	constructor(balance) {
		this.balance = balance;
	}
}

class BankAccount {
	constructor(balance = 0) {
		this.balance = balance;
		this.changes = [new Memento(balance)];// This ads the initial state
		this.current = 0;// This will point to an ubication in the array on changes
	}

	deposit(amount) {
		this.balance += amount;
		let m = new Memento(this.balance);
		this.changes.push(m);
		this.current++;
		return m;
	}

	restore(m) {
		if (m) {
			this.balance = m.balance;
			this.changes.push(m);
			this.current = this.changes.count - 1;
		}
	}

	undo() {
		if (this.current > 0) {
			let m = this.changes[--this.current];
			this.balance = m.balance;
			return m;
		}
		return null;
	}

	redo() {
		// Verifies if there is a new change or not
		if (this.current + 1 < this.changes.length) {
			let m = this.changes[++this.current];
			this.balance = m.balance;
			return m;
		}
		return null;
	}

	toString() {
		return `Balance: $${this.balance}`;
	}
}

let bankAccount = new BankAccount(100);
bankAccount.deposit(50);
bankAccount.deposit(25);
console.log(bankAccount.toString());

bankAccount.undo();
console.log(`Undo 1: ${bankAccount.toString()}`);
bankAccount.undo();
console.log(`Undo 2: ${bankAccount.toString()}`);
bankAccount.redo();
console.log(`Redo 2: ${bankAccount.toString()}`);
