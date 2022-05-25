class NumberExpression {
	constructor(value) {
		this.value = value;
	}

	print(buffer) {
		buffer.push(this.value.toString());
	}
}

// This would receive the expresions
class AdditionExpression {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	// Prints left and right inside a parenthesis
	print(buffer) {
		buffer.push('(');
		this.left.print(buffer);
		buffer.push('+');
		this.right.print(buffer);
		buffer.push(')');
	}
}

// 1 + (2+3)
let e = new AdditionExpression(
	new NumberExpression(1),
	new AdditionExpression(new NumberExpression(2), new NumberExpression(3)),
);

/* On this implementation the visiter is the buffer
and the objective of the implementation is allow your classes to
receive an object or data structure and manipulate it
inside your classes*/
let buffer = [];
e.print(buffer);
console.log(buffer.join(''));
