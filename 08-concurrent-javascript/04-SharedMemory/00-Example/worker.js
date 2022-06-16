const { arrayBuffer } = require("stream/consumers");

const sharedArray = new Int32Array(m.data);

// This allows us to read the data
self.addEventListener(
	'message',
	event => {
		const sharedArray = new Int32Array(event.data);
		for (let i = 0; i < 10; i++) {
			const arrayValue = Atomics.load(sharedArray, i);
			console.log(`The item at array index ${i} is ${arrayValue}`);
		}
	},
	false,
);

// This allows us to write the data

self.addEventListener(
	'message',
	event => {
		const sharedArray = new Int32Array(event.data);
		for (let i = 0; i < 10; i++) {
			if (i % 2 === 0) {
				const storedValue = Atomics.store(sharedArray, i, 1);
				console.log(`The item at array index ${i} is now ${storedValue}`);
			} else {
				const exchangedValue = Atomics.exchange(sharedArray, i, 2);
				console.log(
					`The item at array index ${i} was ${exchangedValue}, now 2`,
				);
			}
		}
	},
	false,
);

// Allows us to wait on a change on an array index and then continue with operations

self.addEventListener('message', event => {
	const sharedArray = new Int32Array(event.data);
	const arrayIndex = 0;
	const expectedStoredValue = 50;

	// The 4 argument %timeout is optional
	Atomics.wait(sharedArray, arrayIndex, expectedStoredValue);
	//Log the new value
	console.log(Atomics.load(sharedArray, arrayIndex));
}, false)

