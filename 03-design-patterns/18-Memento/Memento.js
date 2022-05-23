//! This implementation is incomplete
// This will save the data from a certain operation
class Memento {
	constructor(balance) {
		this.balance = balance;
	}
}

// This handles deposits to a bank acocount
class BankAccount {
	constructor(balance = 0) {
		this.balance = balance;
	}

	deposit(amount) {
		this.balance += amount;
		return new Memento(this.balance);
	}

	restore(m) {
		this.balance = m.balance;
	}

	toString() {
		return `Balance: ${this.balance}`;
	}
}

let bankAccount = new BankAccount(100);
let memento1 = bankAccount.deposit(50);
let memento2 = bankAccount.deposit(25);
console.log(bankAccount.toString());

// restore to memento1
bankAccount.restore(memento1);
console.log(bankAccount.toString());

// restore to memento2
bankAccount.restore(memento2);
console.log(bankAccount.toString());
