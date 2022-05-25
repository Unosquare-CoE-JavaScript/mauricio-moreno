class Person {
	constructor(age = 0) {
		this.age = age;
	}

	drink() {
		return 'drinking';
	}
	drive() {
		return 'driving';
	}
	drinkAndDrive() {
		return 'driving while drunk';
	}
}

class ResponsiblePerson {
	constructor(person) {
		this.person = person;
	}
	// TODO
	set age(age) {
		return (this.person.age = age);
	}
	get age() {
		return this.person.age;
	}

	drink() {
		if (this.person.age > 18) return this.person.drink();
		else return 'too young';
	}
	drive() {
		if (this.person.age > 16) return this.person.drive();
		else return 'too young';
	}
	drinkAndDrive() {
		return 'dead';
	}
}
