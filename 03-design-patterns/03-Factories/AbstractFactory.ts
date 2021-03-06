/**
 * The Abstract Factory interface declares a set of methods that return
 * different abstract products. These products are called a family and are
 * related by a high-level theme or concept. Products of one family are usually
 * able to collaborate among themselves. A family of products may have several
 * variants, but the products of one variant are incompatible with products of
 * another.
 */
interface AbstractFactory {
	createProductA(): AbstractProductA;
	createProductB(): AbstractProductB;
}

/**
 * Concrete Factories produce a family of products that belong to a single
 * variant. The factory guarantees that resulting products are compatible. Note
 * that signatures of the Concrete Factory's methods return an abstract product,
 * while inside the method a concrete product is instantiated.
 */
// Concrete factories =========================================================
class ConcreteFactory1 implements AbstractFactory {
	public createProductA(): AbstractProductA {
		return new concreteProductA1();
	}

	public createProductB(): AbstractProductB {
		return new concreteProductB1();
	}
}

/**
 * Each Concrete Factory has a corresponding product variant.
 */
class ConcreteFactory2 implements AbstractFactory {
	public createProductA(): AbstractProductA {
		return new concreteProductA2();
	}
	public createProductB(): AbstractProductB {
		return new concreteProductB2();
	}
}

/**
 * Each distinct product of a product family should have a base interface. All
 * variants of the product must implement this interface.
 */
// Products created ===========================================================
interface AbstractProductA {
	usefulFunctionA(): string;
}

/**
 * These Concrete Products are created by corresponding Concrete Factories.
 */
class concreteProductA1 implements AbstractProductA {
	public usefulFunctionA(): string {
		return 'The result of the product A1';
	}
}

class concreteProductA2 implements AbstractProductA {
	public usefulFunctionA(): string {
		return 'The result of the product a2';
	}
}

/**
 * Here's the the base interface of another product. All products can interact
 * with each other, but proper interaction is possible only between products of
 * the same concrete variant.
 */
// ===================
interface AbstractProductB {
	usefulFunctionB();
	anotherUsefulFunction(collaborator: AbstractProductA): string;
}

/**
 * These Concrete Products are created by corresponding Concrete Factories.
 */
class concreteProductB1 implements AbstractProductB {
	public usefulFunctionB(): string {
		return 'The result of the product B1';
	}

	public anotherUsefulFunction(collaborator: AbstractProductA): string {
		const result = collaborator.usefulFunctionA();
		return `The result of the B1 collaborating with the (${result})`;
	}
}

class concreteProductB2 implements AbstractProductB {
	public usefulFunctionB(): string {
		return 'The result of the product B2';
	}

	anotherUsefulFunction(collaborator: AbstractProductA): string {
		const result = collaborator.usefulFunctionA();
		return `The result of the B1 collaborating with the (${result})`;
	}
}

/**
 * The client code works with factories and products only through abstract
 * types: AbstractFactory and AbstractProduct. This lets you pass any factory or
 * product subclass to the client code without breaking it.
 */
// Clientcode ==================================================================
function ClientCode_3(factory: AbstractFactory) {
	const productA = factory.createProductA();
	const productB = factory.createProductB();

	console.log(productA.usefulFunctionA());
	console.log(productB.anotherUsefulFunction(productA));
}

console.log('Client: Testing client code with the first factory type...');
ClientCode_3(new ConcreteFactory1());

console.log('');

console.log(
	'Client: Testing the same client code with the second factory type...',
);
