// This is the class that we understand and we need to obtan from the terms of line
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	toSTring() {
		return `(${this.x}, ${this.y})`;
	}
}

// This would be the adaptee that has an interface incompatible with the point
class Line {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}
	toString() {
		let start = `(${this.start.x}, ${this.start.y})`;
		let end = `(${this.end.x}, ${this.end.y})`;
		return `${start}->${end}`;
	}
}

class VectorObject extends Array {}

// Creates some of the data that will be consumed
class VectorRectangle extends VectorObject {
	constructor(x, y, width, height) {
		super();
		this.push(new Line(new Point(x, y), new Point(x + width, y)));
		this.push(
			new Line(new Point(x + width, y), new Point(x + width, y + height)),
		);
		this.push(new Line(new Point(x, y), new Point(x, y + height)));
		this.push(
			new Line(new Point(x, y + height), new Point(x + width, y + height)),
		);
		this.push;
	}
}
// You have to work with this|
let drawPoint = point => {
	process.stdout.write('.');
};

// This would work as an adapter and receives the line and maps the points
// And return it so we can understand better the abstraction of line in terms of points
class LineToPointAdapter extends Array {
	constructor(line) {
		super();
		console.log(
			`${LineToPointAdapter.count++}: Generating point for line ${line.toString()} (no caching)`,
		);

		let left = Math.min(line.start.x, line.end.x);
		let right = Math.max(line.start.x, line.end.x);
		let top = Math.min(line.start.y, line.end.y);
		let bottom = Math.max(line.start.y, line.end.y);

		if (right - left === 0)
			for (let y = top; y <= bottom; ++y) this.push(new Point(left, y));
		else if (line.end.y - line.start.y === 0)
			for (let x = left; x <= right; ++x) this.push(new Point(x, top));
	}
}

LineToPointAdapter.count = 0;

const vectorObjects = [
	new VectorRectangle(1, 1, 10, 10),
	new VectorRectangle(3, 3, 6, 6),
];

let drawPoints = () => {
	for (let vo of vectorObjects)
		for (let line of vo) {
			let adapter = new LineToPointAdapter(line);
			adapter.forEach(drawPoint);
		}
};

drawPoints();
