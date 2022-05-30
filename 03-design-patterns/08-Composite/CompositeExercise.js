class SingleValue {
	constructor(value) {
		this.value = value;
		this.composite = true;
	}
}

class ManyValues {
	constructor() {
		this.isComposite = true;
		this.values = [];
	}
	push(value) {
		this.values.push(value);
	}
	sumTotal() {
		return this.values.reduce((previous, current) => previous + current, 0);
	}
}

let sum = containers =>
	containers
		.map(element => (element.isComposite ? element.sumTotal() : element.value))
		.reduce((previous, current) => previous + current);

let singleValue = new SingleValue(11);
let otherValues = new ManyValues();
otherValues.push(22);
otherValues.push(33);

console.log(sum([singleValue, otherValues]));

// Test of this exercise, you can check with node the result
/*
describe('composite', () => {
	it('Should sum up different objects', () => {
		let singleValue = new SingleValue(11);
		let otherValues = new ManyValues();
		otherValues.push(22);
		otherValues.push(33);
		expect(sum([singleValue, otherValues])).toEqual(66);
	});
});
*/