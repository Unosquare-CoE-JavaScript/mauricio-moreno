/* Monostate creates instances that share its data */

class ChiefExecutiveOfficer {
	// Instad of a constructor this class should work through getters and setters
	get name() {
		return ChiefExecutiveOfficer._name;
	}
	set name(value) {
		ChiefExecutiveOfficer._name = value;
	}

	get age() {
		return ChiefExecutiveOfficer._age;
	}
	set age(value) {
		ChiefExecutiveOfficer._age = value;
	}

	toString() {
		return `CEO's name is ${this.name} and he is ${this.age} years old.`;
	}
}

ChiefExecutiveOfficer._age = undefined;
ChiefExecutiveOfficer._name = undefined;

let ceo = new ChiefExecutiveOfficer();
ceo.name = 'Adam Smith';
ceo.age = 55;

let ceo2 = new ChiefExecutiveOfficer();
ceo.name = 'John Gold';
ceo.age = 12;

/* As you see the last modification will be shared between every instance */
console.log(ceo.toString()); // => John Gold, age 12
console.log(ceo2.toString()); // => John Gold, age 12
