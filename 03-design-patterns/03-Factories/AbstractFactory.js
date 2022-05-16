class HotDrink {
	consume() {}
}

class Tea extends HotDrink {
	consume() {
		console.log('This tea is nice with lemon!');
	}
}

class Coffee extends HotDrink {
	consume() {
		console.log('This coffee is delicious');
	}
}

class HotDrinkFactory {
	// Abstract|
	prepare(amount) {}
}

class TeaFactory extends HotDrinkFactory {
	prepare(amount) {
		console.log(`Put in tea bag, boil water, pour ${amount}ml`);
		return new Tea(); // Customize your factory creation logic
	}
}

class CoffeeFactory extends HotDrinkFactory {
	prepare(amount) {
		console.log(`Grind some beans, boil water, pour ${amount}ml`);
		return new Tea(); // Customize your factory creation logic
	}
}

const AvailableDrink = Object.freeze({
	coffee: CoffeeFactory,
	tea: TeaFactory,
});

class HotDrinkMachine {
	constructor() {
		this.factories = {};
		for (let drink in AvailableDrink) {
			this.factories[drink] = new AvailableDrink[drink]();
		}
	}

	interact(product, amount) {
		return this.factories[product].prepare(amount);
	}

	makeDrink(type) {
		switch (type) {
			case 'tea':
				return new TeaFactory().prepare(200);
			case 'coffee':
				return new CoffeeFactory().prepare(50);
			default:
				throw new Error('We dont have that:(');
		}
	}
}

let machine = new HotDrinkMachine();

// machine.makeDrink('tea');
// machine.makeDrink('coffee');
// machine.makeDrink('four loko');

machine.interact('coffee', 200).consume();
machine.interact('tea', 500).consume();
