/* this will work as the product being created */
class Person {
	constructor() {
		// address
		this.streetAddress = this.postCode = this.city = '';

		//employment
		this.companyName = this.position = '';
		this.annualIncome = 0;
	}

	toString() {
		return (
			`Person lives at ${this.streetAddress}, ${this.city}, ${this.postcode}\n` +
			`and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`
		);
	}
}

// This will work as the builder class
class PersonBuilder {
	// in typescript it need a parameter that implements an interface
	constructor(person = new Person()) {
		this.person = person;
	}

	get lives() {
		return new PersonAddressBuilder(this.person);
	}

	get works() {
		return new PersonJobBuilder(this.person);
	}

	build() {
		return this.person;
	}
}

/* Here you can see that we can divide the person builder in several classes
that extends the person builder and it that way we can distribute the responsibilities */
class PersonJobBuilder extends PersonBuilder {
	constructor(person) {
		super(person);
	}

	at(companyName) {
		this.person.companyName = companyName;
		return this;
	}

	asA(position) {
		this.person.position = position;
		return this;
	}

	earning(annualIncome) {
		this.person.annualIncome = annualIncome;
		return this;
	}
}

class PersonAddressBuilder extends PersonBuilder {
	constructor(person) {
		super(person);
	}

	at(streetAddress) {
		this.person.streetAddress = streetAddress;
		return this;
	}

	withPostCode(postCode) {
		this.person.postCode = postCode;
		return this;
	}

	in(city) {
		this.person.city = city;
		return this;
	}
}

let personBuilder = new PersonBuilder();

const person = personBuilder.lives
	.at('123 Londo Road')
	.in('London')
	.withPostCode('SW12BC')
	.works.at('Unosquare')
	.asA('Engineer')
	.earning(700000)
	.build();

console.log(person.toString());
