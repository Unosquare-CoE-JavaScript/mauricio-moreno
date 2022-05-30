// A virtual proxy appears to be a real object but it is not,
// it is a sumulation

class Image {
	constructor(url) {
		this.url = url;
		// This is something we want to avoid
		console.log(`Loading image from ${this.url}`);
	}

	draw() {
		console.log(`Drawing image ${this.url}`);
	}
}

class LazyImage {
	constructor(url) {
		this.url = url;
	}

	/* we will faint that we are the object until someone need the
	method draw at that moment we create a real image and execute
	the metod draw of that class*/
	draw() {
		if (!this.image) this.image = new Image(this.url);
		this.image.draw();
	}
}

function drawImage(img) {
	console.log('About to draw the image');
	img.draw();
	console.log('Done drawing the image');
}

let img = new LazyImage('http://pokemon.com/pikachu.png');
drawImage(img);
