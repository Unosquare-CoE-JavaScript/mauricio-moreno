// This has the default methods that we can use, but also needs some required operations
abstract class AbstractClass {
	public templateMethod(): void {
		this.requiredOperation1();
		this.baseOperation2();
		this.hook1();
		this.requiredOperation2();
		this.baseOperation3();
		this.hook2();
	}

	protected baseOperation1(): void {
		console.log('AbstractClass says: I am doing the bulk of the work.');
	}

	protected baseOperation2(): void {
		console.log(
			'AbstractClass says: But I let subclasses override some operations.',
		);
	}

	protected baseOperation3(): void {
		console.log(
			'AbstractClass says: But I am doing the bulk of the work anyway,',
		);
	}

	protected abstract requiredOperation1(): void;
	protected abstract requiredOperation2(): void;

	protected hook1(): void {}
	protected hook2(): void {}
}

class ConcreteClass1 extends AbstractClass {
	protected requiredOperation1(): void {
		console.log('ConcreteClass1 says: Implemented Operation1');
	}
	protected requiredOperation2(): void {
		console.log('ConcreteClass1 says: Implemented Operation2');
	}
}

class ConcreteClass2 extends AbstractClass {
	protected requiredOperation1(): void {
		console.log('ConcreteClass2 says: Implemented Operation1');
	}
	protected requiredOperation2(): void {
		console.log('ConcreteClass2 says: Implemented Operation2');
	}
	protected hook1(): void {
		console.log('ConcreteClass2 says: Overriden Hook1');
	}
}

// Client code ======================================================
const clientCode_22 = (abstractClass: AbstractClass) => {
	abstractClass.templateMethod();
};

console.log('Some client code can work with a different subclasses:');
clientCode_22(new ConcreteClass1());
console.log('');

console.log('Same client code can work with different subclasses');
clientCode_22(new ConcreteClass2());
