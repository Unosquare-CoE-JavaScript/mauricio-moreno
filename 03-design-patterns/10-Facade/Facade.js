// low level process or systems ====================================
class Buffer extends Array {
	constructor(width = 30, height = 20) {
		super();
		this.width = width;
		this.height = height;
		this.alloc(width * height);
	}

	write(text, position = 0) {
		// write to the buffer
	}
}

class Viewport {
	constructor(buffer = new Buffer()) {
		this.buffer = buffer;
		this.offset = 0;
	}

	// high-level
	append(text, pos) {
		this.buffer.write(text, pos + this.offset);
	}

	getCharAt(index) {
		return this.buffer[this.offset + index];
	}
}

// This is the facade ============================================
/* The task of the facade is to simplify a process through an api
in this case uses different low level systems to create a simple function
in this case it is a console */
class Console {
	// These are the processes created
	constructor() {
		this.buffer = new Buffer();
		this.currentViewport = new Viewport(this.buffer);
		this.buffers = [this.buffer];
		this.viewports = [this.currentViewport];
	}

	// high-level
	write(text) {
		this.currentViewport.buffer.write(text);
	}

	// low-level
	getCharAt(index) {
		return this.currentViewport.getCharAt(index);
	}
}

let c = new Console();
c.write('hello');
let ch = c.getCharAt(0);
