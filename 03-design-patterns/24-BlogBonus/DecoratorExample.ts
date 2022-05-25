// Abstract classes ====================================
abstract class Animal {
	abstract move(): void;
}

abstract class SuperDecorator extends Animal {
	protected comp: Animal;
	constructor(decoratedAnimal: Animal) {
		super();
		this.comp = decoratedAnimal; // This will remain the previous functionallity
	}
	abstract move(): void;
}

// Concrete animal =====================================
class Dog extends Animal {
	public move(): void {
		console.log('The dog is moving...');
	}
}

// Decorators ==========================================
class SuperAnimal extends SuperDecorator {
	public move(): void {
		console.log('starts flying...');
		this.comp.move();
		console.log('Landing...');
	}
}

class SwimmingAnimal extends SuperDecorator {
	public move(): void {
		console.log('Jumping into the water...');
		this.comp.move();
	}
}

// Client code ===========================================

const dog_24 = new Dog();

console.log('------------- Non decorated attempt: -------------------');
dog_24.move();

console.log('------------- Flying decorator: -------------------');
const superDog = new SuperAnimal(dog_24);
superDog.move();

console.log("------------------ Now let's go swimming -------------------");
const swimmingDog = new SwimmingAnimal(dog_24);
swimmingDog.move();
