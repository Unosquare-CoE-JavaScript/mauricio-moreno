class Event {
	constructor() {
		this.handlers = new Map();
		this.count = 0; // This takes the role of an index with we can search handlers
	}

	subscribe(handler) {
		this.handlers.set(++this.count, handler);
		return this.count; // Send the id of the handler
	}

	unsubscribe(index) {
		this.handlers.delete(index);
	}

	// 1) who fired the event?
	// 2) additional data (event args)
	fire(sender, args) {
		// Notifies to every handler the changes
		this.handlers.forEach(element => element(sender, args));
	}
}

// This is the data of the event
class FallsIllArgs {
	constructor(address) {
		this.address = address;
	}
}

class Person {
	constructor(address) {
		this.address = address;
		this.fallsIll = new Event(); // We can suscrie to this event
	}

	catchCold() {
		this.fallsIll.fire(this, new FallsIllArgs(this.address)); // This send data to every suscriber
	}
}

let person = new Person('123 London Road');
let sub = person.fallsIll.subscribe((s, a) => {
	console.log(`A doctor has been called ` + `to ${a.address}`);
});

// Every time we call this will notify the handlers
person.catchCold();
person.catchCold();

person.fallsIll.unsubscribe(sub);
person.catchCold();
