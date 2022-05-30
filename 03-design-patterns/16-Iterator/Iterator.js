class Stuff {
	constructor() {
		this.a = 11;
		this.b = 22;
	}

	// default iterator
	/*This is managed by javascript as the api that we can use to work
	with the for loops, rest operators etc. */
	[Symbol.iterator]() {
		let i = 0;
		let self = this;
		return {
			next: function () {
				return {
					done: i > 1, // boolean, returns when you end the loop
					value: self[i++ === 0 ? 'a' : 'b'],
				};
			},
		};
	}

	// The same as the previous function but because of we are using a function
	// The structure is different
	get backwards() {
		let i = 0;
		let self = this;
		return {
			next: function () {
				return {
					done: i > 1,
					value: self[i++ === 0 ? 'b' : 'a'],
				};
			},
			// make iterator iterable
			[Symbol.iterator]: function () {
				return this;
			},
		};
	}
}

// Here we can see the behavior of the for-of and the for-in loops
let values = [100, 200, 300];
for (let i in values) console.log(`Element at pos ${i} is ${values[i]}`);
for (let v of values) console.log(`Value is ${v}`);

/* Here we can see that our iterator works with foor loops because we
create an api for the iterations */
let stuff = new Stuff();
for (let item of stuff) console.log(`${item}`);
for (let item of stuff.backwards) console.log(`${item}`);
