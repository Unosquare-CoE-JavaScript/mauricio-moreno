// This file does the same as intrusive visitor but with optimizations
class NumberExpression {
	constructor(value) {
		this.value = value;
	}
}

class AdditionExpression {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}
}

// With this class we respect the separation of concerns principle
class ExpressionPrinter {
	print(e, buffer) {
		// This would put the value to the array
		if (e instanceof NumberExpression) {
			buffer.push(e.value);
		} else if (e instanceof AdditionExpression) {
			buffer.push('(');
			this.print(e.left, buffer);// recursively send until find numberExpression
			buffer.push('+');
			this.print(e.right, buffer);
			buffer.push(')');
		}
	}
}

let e = new AdditionExpression(
	new NumberExpression(1),
	new AdditionExpression(new NumberExpression(2), new NumberExpression(3)),
);
let buffer = [];
let ep = new ExpressionPrinter();
ep.print(e, buffer);
console.log(buffer.join(''));
