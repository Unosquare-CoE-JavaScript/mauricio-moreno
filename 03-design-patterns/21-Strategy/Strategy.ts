class Context {
	private strategy: Strategy;

	constructor(strategy: Strategy) {
		this.strategy = strategy;
	}

	public setStrategy(strategy: Strategy) {
		this.strategy = strategy;
	}

	public doSomeBusinessLogic(): void {
		console.log(
			"Context: Sotring data using the strategy (not sure how it'll do it)",
		);
		const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
		console.log(result.join(','));
	}
}

interface Strategy {
	doAlgorithm(data: Array<string>): Array<string>;
}

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

// Client Code ===========================================================

const context = new Context(new ConcreteStrategyA());
console.log('Client: Strategy is set to normal sorting.');
context.doSomeBusinessLogic();

console.log('');

console.log('Client: strategy is set to reverse sorting');
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();
