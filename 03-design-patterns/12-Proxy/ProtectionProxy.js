// Protection proxy will wrap an element that you dont want to be
// manipulated and also you can provide rules to use it, in this case
// the driver must be older than 16 years

class Car {
	drive() {
		console.log('Car being driven');
	}
}

// This class will protect the usage of the class
class CarProxy {
	constructor(driver) {
		this.driver = driver;
		this._car = new Car();
	}

	/* This is the same method as the car but it will evaluate if a condition
	is acomplished before executing the class, this is the protection characteristic */
	drive() {
		if (this.driver.age >= 16) this._car.drive();
		else console.log('Driver too young');
	}
}

class Driver {
	constructor(age) {
		this.age = age;
	}
}

let car = new Car();
car.drive();

// this will not work unless you are older than 16
let car2 = new CarProxy(new Driver(12));
car2.drive();
