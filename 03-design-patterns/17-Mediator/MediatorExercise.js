class Mediator {
	constructor() {
		this.participants = [];
	}

	add(participant) {
		this.participants.push(participant);
	}

	send(messages, sender) {
		this.participants.forEach(element => {
			if (element !== sender) element.value += messages;
		});
	}
}

class Participant {
	constructor(mediator) {
		this.mediator = mediator;
		this.value = 0;
		mediator.add(this);
	}

	say(messages) {
		this.mediator.send(messages, this);
	}
}

('mauriciomorenomorales2@gmail.com');
('mauriciomorenomorales2@gmail.com');
('mauriciomorenomorales2@gmail.com');
