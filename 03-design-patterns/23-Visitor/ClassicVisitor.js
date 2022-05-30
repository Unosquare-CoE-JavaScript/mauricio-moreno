class NumberExpression {
	constructor(value) {
		this.value = value;
	}

	accept(visitor) {
		visitor.visitNumber(this);
	}
}

class AdditionExpression {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	accept(visitor) {
		visitor.visitAddition(this);
	}
}

class Visitor {
	constructor() {
		this.buffer = [];
	}
}

/* This class would do some of the clientcode in the previous
section it will include the buffer and the join section*/
class ExpressionPrinter extends Visitor {
	constructor() {
		super();
	}

	visitNumber(expression) {
		this.buffer.push(expression.value);
	}

	visitAddition(expression) {
		this.buffer.push('(');
		expression.left.accept(this);// We send this object
		this.buffer.push('+');
		expression.right.accept(this);
		this.buffer.push(')');
	}

	toString() {
		return this.buffer.join('');
	}
}

// With the previous implementation we can add more functionalities
// for example this class will sum the values
class ExpressionCalculator {
	// this visitor is stateful which can lead to problems
	constructor() {
		this.result = 0;
	}

	visitNumber(expression) {
		this.result = expression.value;
	}

	visitAddition(expression) {
		expression.left.accept(this);
		let temp = this.result;
		expression.right.accept(this);
		this.result += temp;
	}
}

let expression = new AdditionExpression(
	new NumberExpression(1),
	new AdditionExpression(new NumberExpression(2), new NumberExpression(3)),
);

const expressionPointer = new ExpressionPrinter();
expressionPointer.visitAddition(expression);

const expressionCalculator = new ExpressionCalculator();
expressionCalculator.visitAddition(expression);

console.log(`${expressionPointer.toString()} = ${expressionCalculator.result}`);
