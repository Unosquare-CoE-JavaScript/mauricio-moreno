type InternalState = {
	event: string;
};

abstract class Observer_24 {
	abstract update(state: InternalState): string;
}

abstract class Observable {
	protected observers: Array<Observer_24> = [];
	protected state: InternalState = { event: '' };

	public addObserver(observer: Observer_24): void {
		this.observers.push(observer);
	}

	protected notify() {
		this.observers.forEach(observer => observer.update(this.state));
	}
}

class ConsoleLogger extends Observer_24 {
	public update(newState: InternalState) {
		console.log(`New internal state update: ${newState}`)
	}
}

class InputElement extends Observable {
	public click(): void {
		this.state = {event: "click"};
		this.notify();
	}
}

const input = new InputElement();
input.addObserver(new ConsoleLogger());

input.click();