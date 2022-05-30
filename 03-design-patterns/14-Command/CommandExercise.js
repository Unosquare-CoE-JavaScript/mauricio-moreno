let Action = Object.freeze({
	deposit: 0,
	withdraw: 1,
});

class Command {
	constructor(action, amount) {
		this.action = action;
		this.amount = amount;
		this.success = false;
	}
	deposit() {}
}

class Account {
	constructor() {
		this.balance = 0;
	}

	process(command) {
		console.log(command.action, command.amount);
		if (command.action === Action.deposit) {
			this.balance += command.amount;
			command.success = true;
		} else if (command.action === Action.withdraw) {
			if (this.balance > command.amount) {
				this.balance -= command.amount;
				command.success = true;
			} else {
				command.success = false;
			}
		}
		console.log(this.balance);
	}
}
