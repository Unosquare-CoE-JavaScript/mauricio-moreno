class Person {
	constructor(name) {
		this.name = name;
		this.chatLog = [];
	}

	receive(sender, message) {
		let completeMessage = `${sender}: '${message}'`;
		console.log(`[${this.name}'s chat session] ${completeMessage}`);
		this.chatLog.push(completeMessage);
	}

	say(message) {
		this.room.broadcast(this.name, message);
	}

	privateMessage(who, message) {
		this.room.message(this.name, who, message);
	}
}

// This works as an observer and also as a mediator
class ChatRoom {
	constructor() {
		this.people = [];
	}

	/*Private*/ broadcast(source, message) {
		for (let p of this.people)
			if (p.name !== source) p.receive(source, message);
	}

	// This will be like a suscribe in a observer
	join(p) {
		let joinMsg = `${p.name} joins the chat`;
		this.broadcast('room', joinMsg); // Sends the message to all memers
		p.room = this;
		this.people.push(p);
	}

	// Sends private messages one <-> one
	message(source, destination, message) {
		for (let p of this.people)
			if (p.name === destination) p.receive(source, message);
	}
}

let room = new ChatRoom();

let john = new Person('John');
let jane = new Person('Jane');

room.join(john);
room.join(jane);

john.say('hi room');
jane.say('oh, hey john');

let simon = new Person('Simon');
room.join(simon);
simon.say('hi everyone!');

jane.privateMessage('Simon', 'glad you could join us!');
