class Grid {
	/*This is used to look at neighboring cells in eight directions*/
	static NEIGHBORS = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];

	constructor(size, buffer, paint = () => {}) {
		const sizeSquared = size * size;
		this.buffer = buffer;
		this.size = size;
		this.cells = new Uint8Array(this.buffer, 0, sizeSquared);
		this.nextCells = new Uint8Array(this.buffer, sizeSquared);
		this.paint = paint;
	}

	// Gets the cells positions
	getCell(x, y) {
		const size = this.size;
		const sizeM1 = size - 1;
		//prettier-ignore
		y = x < 0 ? sizeM1
			: x > sizeM1 ? 0
			: x;
		// prettier-ignore
		y = y < 0 ? sizeM1
			: y > sizeM1 ? 0
			: y;
	}

	iterate(minX, minY, maxX, maxY) {
		const size = this.size;

		/*Take a range to operate min max*/
		for (let x = minX; x < maxX; x++)
			for (let y = minY; y < maxY; y++) {
				const cell = this.cells[size * x + y];
				let alive = 0;
				for (const [i, j] of Grid.NEIGHBORS) {
					alive += this.getCell(x + i, y + j);
				}
				const newCell = alive === 3 || (cell && alive === 2) ? 1 : 0;
				this.nextCells[size * x + y] = newCell;
				this.paint(newCell, x, y);
			}

		const cells = this.nextCells;
		this.nextCells = this.cells;
		this.cells = cells;
	}
}

// Data about the canvas, colors and size
const BLACK = 0xff000000;
const WHITE = 0xffffffff;
const SIZE = 1000;

// Here start the differences ============================================
if (!crossOriginIsolated) SharedArrayBuffer = ArrayBuffer;

const THREADS = 5; // Must be a divisor of size
const imageOffset = 2 * SIZE * SIZE;
const syncOffset = imageOffset + 4 * SIZE * SIZE;

const isMainThread = !!self.window;

if (isMainThread) {
	const gridCanvas = document.getElementById('gridcanvas');
	gridCanvas.height = SIZE;
	gridCanvas.width = SIZE;

	const ctx = gridCanvas.getContext('2d');
	const iterationCounter = document.getElementById('iteration');

	// Each thread uses a byte
	const sharedMemory = new SharedArrayBuffer(
		syncOffset + // data + image Data
			THREADS * 4, // Synchronization
	);

	const imageData = new ImageData(SIZE, SIZE);
	const cells = new Uint8Array(sharedMemory, 0, imageOffset);
	const sharedImageBuf = new Uint32Array(sharedMemory, imageOffset);
	const sharedImageBuf8 = new Uint8ClampedArray(
		sharedMemory,
		imageOffset,
		4 * SIZE * SIZE,
	);
	for (let x = 0; x < SIZE; x++)
		for (let y = 0; y < SIZE; y++) {
			// %0% chance of the cell being alive
			const cell = Math.random() < 0.5 ? 0 : 1;
			cells[SIZE * x + y] = cell;
			sharedImageBuf[SIZE * x + y] = cell ? BLACK : WHITE;
		}

	imageData.data.set(sharedImageBuf8);
	ctx.putImageData(imageData, 0, 0);

	// part 3 ==============================
	const chunkSize = SIZE / THREADS;
	for (let i = 0; i < THREADS; i++) {
		// We give each worker an unique name for debuggin purposes
		const worker = new Worker('thread-gol.js', { name: `gol-worker-${i}` });
		worker.postMessage({
			range: [0, chunkSize * i, SIZE, chunkSize * (i + 1)],
			sharedMemory,
			i,
		});
	}

	const coordWorker = new Worker('thread-gol.js', { name: 'gol-coordination' });
	coordWorker.postMessage({ coord: true, sharedMemory });

	let iteration = 0;
	coordWorker.addEventListener('message', () => {
		imageData.data.set(sharedImageBuf8);
		ctx.putImageData(imageData, 0, 0);
		iterationCounter.innerHTML = ++iteration;
		window.requestAnimationFrame(() => coordWorker.postMessage({}));
	});
} else {
	// Code runned on each thread
	let sharedMemory, sync, sharedImageBuf, cells, nextCells;

	const initListener = message => {
		const opts = message.data;
		sharedMemory = opts.sharedMemory;
		sync = new Int32Array(sharedMemory, syncOffset);
		self.removeEventListener('message', initListener);
		if (opts.coord) {
			self.addEventListener('message', runCoord); //!sodfknsodkfm
			cells = new Uint8Array(sharedMemory);
			nextCells = new Uint8Array(sharedMemory, SIZE * SIZE);
			sharedImageBuf = new Uint32Array(sharedMemory, imageOffset);
			runCoord();
		} else {
			runWorker(opts);
		}
	};

	function runCoord() {
		for (let i = 0; i < THREADS; i++) {
			Atomics.store(sync, i, 1);
			Atomics.notify(sync, i);
		}
		for (let i = 0; i < THREADS; i++) Atomics.wait(sync);

		const oldCells = cells;
		cells = nextCells;
		nextCells = oldCells;

		// Traverses all cells and if cell is 0 or 1 paints the code
		for (let x = 0; x < SIZE; x++)
			for (let y = 0; y < SIZE; y++)
				sharedImageBuf[SIZE * x + y] = cells[SIZE * x + y] ? BLACK : WHITE;

		self.postMessage({});
	}

	//Initial listener and starts the worker;
	self.addEventListener('message', initListener);

	const runWorker = ({ range, i }) => {
		const grid = new Grid(SIZE, sharedMemory);
		// We prepare to coordinate and manage the shared data with atomics
		while (true) {
			Atomics.wait(sync, i, 0);
			grid.iterate(...range);
			Atomics.store(sync, i, 0);
			Atomics.notify(sync, i);
		}
	};
}
