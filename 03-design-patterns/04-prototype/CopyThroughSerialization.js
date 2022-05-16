class Address {
	constructor(streetAddress, city, country) {
		this.streetAddress = streetAddress;
		this.city = city;
		this.country = country;
	}

	toString() {
		return `Address: ${this.streetAddress}, ` + `${this.city}, ${this.country}`;
	}
}

class Person {
	constructor(name, address) {
		this.name = name;
		this.address = address;
	}

	toString() {
		return `${this.name} lives at ${this.address}`;
	}

	greet() {
		console.log(
			`Hi, my name is ${this.name}, ` + `I live at ${this.address.toString()}`,
		);
	}
}

/* On this lesson will work with the previous classes Address and Person
where Person depends on -> Address */
//!======================= Code starts here ========================

// A serializer copies objects while preserves its type
class Serializer {
	constructor(types) {
		//Where types: Array<Classes>|
		this.types = types;
	}

	/*Private*/ markRecursive(object) {
		/* find if the object passed is available in the classes of the serializer*/
		let index = this.types.findIndex(type => {
			return type.name === object.constructor.name;
		});
		/*If the object has a class then it receives the position of the class in the types*/
		if (index !== -1) {
			object['typeIndex'] = index;

			for (let key in object)
				if (object.hasOwnProperty(key) && object[key] != null)
					this.markRecursive(object[key]);
		}
	}

	/*Only will return anything different if the object is assosiated to a class
	and that class is registered in the types array*/
	/*Private*/ reconstructRecursive(object) {
		if (object.hasOwnProperty('typeIndex')) {
			let type = this.types[object.typeIndex];
			let obj = new type();

			for (let key in object)
				if (object.hasOwnProperty(key) && object[key] != null)
					obj[key] = this.reconstructRecursive(object[key]);

			delete obj.typeIndex;
			return obj;
		}
		return object;
	}

	clone(object) {
		this.markRecursive(object); // Verifies if it has object classes nested
		let copy = JSON.parse(JSON.stringify(object)); //Creates a new object
		return this.reconstructRecursive(copy); // creates the returned object
	}
}

const john = new Person('John', new Address('123 London road', 'London', 'UK'));

/* This is another way to copy an object, the problem is that a JSON only have data
and is not attached to a class you can not use functions like toString or greet

```
let jane = JSON.parse(JSON.stringify(john));

You need to create a serializer and deserializers class
*/

let serializer = new Serializer([Person, Address]);
let jane = serializer.clone(john);

jane.name = 'Jane';

jane.greet();
