class CombinationLock {
	constructor(combination) {
		this.combination = combination;
		this.reset();
		// Converts conbination to a string
		this.combination = this.combination.map(String).join('');
	}

	reset() {
		this.status = 'LOCKED';
		this.digits = [];
		this.failed = false;
	}

	enterDigit(digit) {
		// Adds new digits
		if (this.status === 'LOCKED') this.status = '';
		this.status += `${digit}`;

		// Verifies digit entered is correct
		if (
			this.status[this.status.length - 1] !==
			this.combination[this.status.length - 1]
		) {
			this.status = 'ERROR';
			return;
		}

		// Open the lock if everything matches
		if (this.status === this.combination) {
			this.status = 'OPEN';
			return;
		}
	}
}

let c1 = new CombinationLock([1, 2, 3, 4, 5]);
console.log(c1.status); // LOCKED
c1.enterDigit(1); // 1
console.log(c1.status);
c1.enterDigit(2); //2
console.log(c1.status);
c1.enterDigit(3); //3
console.log(c1.status);
c1.enterDigit(4); //4
console.log(c1.status);
c1.enterDigit(5); //OPEN
console.log(c1.status);
