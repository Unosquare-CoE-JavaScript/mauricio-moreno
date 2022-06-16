const UNLOCKED = 0;
const LOCKED = 1;

const { compareExchange, wait, notify } = Atomics;

module.exports = class Mutex {
	constructor(shared, index) {
		this.shared = shared;
		this.index = index;
	}

	// With this two methods we can lock or unlock each thread
	acquire = function () {
		if (compareExchange(this.shared, this.index, UNLOCKED, LOCKED) === UNLOCKED)
			return;

		wait(this.shared, this.index, LOCKED);
		this.acquire();
	};

	release = function () {
		if (compareExchange(this.shared, this.index, LOCKED, UNLOCKED) != LOCKED)
			throw new Error('was not acquired');

		notify(this.shared, this.index, 1);
	};

	// Here we execute the function of the worker
	exec = function (fn) {
		this.acquire();
		try {
			return fn();
		} finally {
			this.release();
		}
	};
};
