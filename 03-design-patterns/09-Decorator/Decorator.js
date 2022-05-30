// the concrete components and the decorators will implement both the class shape
class Shape {}

// These are the concrete components ===========================================
class Circle extends Shape {
	constructor(radius = 0) {
		super();
		this.radius = radius;
	}

	resize(factor) {
		this.radius *= factor;
	}

	toString() {
		return `A circle of radius ${this.radius}`;
	}
}

class Square extends Shape {
	constructor(side = 0) {
		super();
		this.side = side;
	}

	toString() {
		return `A square with side ${this.side}`;
	}
}

// These are the decorators ======================================================
// we don't want ColoredSquare, ColoredCircle, etc.
// With this we can make more combinations with less classes
class ColoredShape extends Shape {
	constructor(shape, color) {
		super();
		this.shape = shape;
		this.color = color;
	}

	toString() {
		return `${this.shape.toString()} ` + `has the color ${this.color}`;
	}
}

class TransparentShape extends Shape {
	constructor(shape, transparency) {
		super();
		this.shape = shape;
		this.transparency = transparency;
	}

	toString() {
		return (
			`${this.shape.toString()} has ` +
			`${this.transparency * 100.0}% transparency`
		);
	}
}

// We can add attributes to the concrete components as layers throuw passing a component
//inside a decorator
let circle = new Circle(2);
console.log(circle.toString());

let redCircle = new ColoredShape(circle, 'red');

// Some attributes of the parent can be accessed in this way
redCircle.shape.resize(2);

console.log(redCircle.toString());

// impossible: redHalfCircle is not a Circle
// redHalfCircle.resize(2);

let redHalfCircle = new TransparentShape(redCircle, 0.5);
console.log(redHalfCircle.toString());
