// This as the Bridge.ts example will execute the same methods of the
// Class passed indepently of the concrete implemenattions
class VectorRenderer {
	renderCircle(radius) {
		console.log(`Drawing a circle of radius ${radius}`);
	}
}
class RasterRenderer {
	renderCircle(radius) {
		console.log(`Drawing pixels for a cirlc eof radius ${radius}`);
	}
}

// Interface
class Shape {
	constructor(renderer) {
		this.renderer = renderer;
	}
}

// This would have the same method and execute it no matters the type of
// renderer
// Concrete Implementations ============================================
class Circle extends Shape {
	constructor(renderer, radius) {
		super(renderer);
		this.radius = radius;
	}

	draw() {
		this.renderer.renderCircle(this.radius);
	}

	resize(factor) {
		this.radius *= factor;
	}
}

class Square {
	constructor(renderer) {
		this.renderer = renderer;
	}
}

// Client Code =======================================================
const raster = new RasterRenderer();
const vector = new VectorRenderer();

const circle = new Circle(vector, 5);
circle.draw();
circle.resize(2);
circle.draw();
