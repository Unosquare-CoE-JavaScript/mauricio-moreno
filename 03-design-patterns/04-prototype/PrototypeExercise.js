class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	deepCopy() {
		return new Point(this.x, this.y);
	}
}

class Line {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}

	deepCopy() {
		return new Line(this.start.deepCopy(), this.end.deepCopy());
	}
}

const line = new Line(new Point(1, 2), new Point(2, 3));
const line2 = line.deepCopy();

console.log(line);

console.log(line2)
