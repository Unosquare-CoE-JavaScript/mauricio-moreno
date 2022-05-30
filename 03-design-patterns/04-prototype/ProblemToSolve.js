class Address {
	constructor(streetAddress, city, country) {
		this.streetAddress = streetAddress;
		this.city = city;
		this.country = country;
	}

	// Read line 25
	deepCopy() {
		return new Address(this.streetAddress, this.city, this.country);
	}

	toString() {
		return `Address ${this.streetAddress}. ${this.city} ${this.country}`;
	}
}

//This is the entity we want to clone
class Person {
	constructor(name, address) {
		this.name = name;
		this.address = address;
	}

	/*If you want a class to suport the clonation of its instances yu need to
	add a method in that class that allow that*/
	deepCopy() {
		return new Person(this.name, this.address.deepCopy());
	}

	toString() {
		return `${this.name} lives at ${this.address}`;
	}
}

const john = new Person('John', new Address('123 London road', 'London', 'UK'));

/*
Cloning it in this way will throw an error because you are not copying the object
itself, you are copying the reference to it

const jane = john
*/

// This is the correct way to do this
let jane = john.deepCopy();

/* This would overwrite the john object because we are mutating the memory reference
we are not creating a nwe object and mutate it */
jane.name = 'Jane';
jane.address.streetAddress = '321 Angel St';

// Now you see that it works correctly
console.log(john.toString());
console.log(jane.toString());
