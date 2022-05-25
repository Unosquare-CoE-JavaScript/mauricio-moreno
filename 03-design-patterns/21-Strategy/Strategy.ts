/**
 * The Strategy interface declares operations common to all supported versions
 * of some algorithm.
 *
 * The Context uses this interface to call the algorithm defined by Concrete
 * Strategies.
 */
// Interfaces =============================================================
interface Strategy {
	doAlgorithm(data: Array<string>): Array<string>;
}

/**
 * The Context defines the interface of interest to clients.
 */
// Classes =================================================================
class Context_21 {
	private strategy: Strategy;

	/**
	 * Usually, the Context accepts a strategy through the constructor, but also
	 * provides a setter to change it at runtime.
	 */
	constructor(strategy: Strategy) {
		this.strategy = strategy;
	}

	public setStrategy(strategy: Strategy) {
		this.strategy = strategy;
	}

	/**
	 * The Context delegates some work to the Strategy object instead of
	 * implementing multiple versions of the algorithm on its own.
	 */

	public doSomeBusinessLogic(): void {
		console.log(
			"Context: Sotring data using the strategy (not sure how it'll do it)",
		);
		const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
		console.log(result.join(','));
	}
}

// Conrete Strategies ========================================================
/**
 * The Strategy interface declares operations common to all supported versions
 * of some algorithm.
 *
 * The Context uses this interface to call the algorithm defined by Concrete
 * Strategies.
 */
class ConcreteStrategyA implements Strategy {
	public doAlgorithm(data: Array<string>): Array<string> {
		return data.sort();
	}
}

class ConcreteStrategyB implements Strategy {
	public doAlgorithm(data: Array<string>): Array<string> {
		return data.reverse();
	}
}
/**
 * The client code picks a concrete strategy and passes it to the context. The
 * client should be aware of the differences between strategies in order to make
 * the right choice.
 */
// Client Code ===========================================================
const context_21 = new Context_21(new ConcreteStrategyA());
console.log('Client: Strategy is set to normal sorting.');
context_21.doSomeBusinessLogic();

console.log('');

console.log('Client: strategy is set to reverse sorting');
context_21.setStrategy(new ConcreteStrategyB());
context_21.doSomeBusinessLogic();
