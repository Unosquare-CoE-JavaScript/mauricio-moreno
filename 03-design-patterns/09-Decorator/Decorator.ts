import { Functor } from '../Func/Functor';

// Interfaces ==========================================
/**
 * The base Component interface defines operations that can be altered by
 * decorators.
 */
interface Component_9 {
	operation(): string;
}
// Components ===========================================
/**
 * Concrete Components provide default implementations of the operations. There
 * might be several variations of these classes.
 */
class ConcreteComponent implements Component_9 {
	public operation(): string {
		return 'ConcreteComponent';
	}
}

// Decorators ===========================================
/**
 * The base Decorator class follows the same interface as the other components.
 * The primary purpose of this class is to define the wrapping interface for all
 * concrete decorators. The default implementation of the wrapping code might
 * include a field for storing a wrapped component and the means to initialize
 * it.
 */
class Decorator implements Component_9 {
	protected component: Component_9;

	constructor(component: Component_9) {
		this.component = component;
	}

	public operation(): string {
		return this.component.operation();
	}
}

/**
 * Concrete Decorators call the wrapped object and alter its result in some way.
 */
class ConcreteDecoratorA extends Decorator {
	/**
	 * Decorators may call parent implementation of the operation, instead of
	 * calling the wrapped object directly. This approach simplifies extension
	 * of decorator classes.
	 */
	public operation(): string {
		return `ConcreteDecoratorA(${super.operation()})`;
	}
}
/**
 * Decorators can execute their behavior either before or after the call to a
 * wrapped object.
 */
class ConcreteDecoratorB extends Decorator {
	public operation(): string {
		return `ConcreteDecoratorB(${super.operation()})`;
	}
}

/**
 * The client code works with all objects using the Component interface. This
 * way it can stay independent of the concrete classes of components it works
 * with.
 */
// Client Code ============================================
function clientCode(component: Component_9) {
	console.log(`RESULT: ${component.operation()}`);
}

/**
 * This way the client code can support both simple components...
 */
const simple_9 = new ConcreteComponent();
console.log('client Ive got a simple component:');
clientCode(simple_9);
console.log('');

/**
 * ...as well as decorated ones.
 *
 * Note how decorators can wrap not only simple components but the other
 * decorators as well.
 */
//! Use case of a Functor
const decorator2 = Functor(simple_9)
	.map(x => new ConcreteDecoratorA(x))
	.map(x => new ConcreteDecoratorB(x))
	.return();

console.log('Client: Now Ive got a decorated component:');
console.log(decorator2);

// We can repeat a same decorator in the component
console.log('');
const decorator3 = Functor(simple_9)
	.map(x => new ConcreteDecoratorA(x))
	.map(x => new ConcreteDecoratorA(x))
	.map(x => new ConcreteDecoratorB(x))
	.return();

console.log('This has repeated a class inside it');
console.log(decorator3);
