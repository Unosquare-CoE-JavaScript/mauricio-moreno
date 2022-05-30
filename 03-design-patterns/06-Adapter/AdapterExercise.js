// This is the adaptee
class Square {
	constructor(side) {
		this.side = side;
	}
}

function area(rectangle) {
	return rectangle._width * rectangle._height; // These properties are the Target
}

// Thi is the adapter
class SquareToRectangleAdapter {
	constructor(square) {
		this._height = square.side;
		this._width = square.side;
	}
}

// build an adapter called SquareToRectangleAdapter
// s.t. we could call
//
// let sq = new Square(123);
// area(new SquareToRectangleAdapter(sq));
