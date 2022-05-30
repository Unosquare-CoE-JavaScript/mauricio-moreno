interface Handler {
	setNext(handler: Handler): Handler;
	handle(request: string): string;
}

abstract class AbstractHandler implements Handler {
	private nextHandler: Handler;

	public setNext(handler: Handler): Handler {
		this.nextHandler = handler;
		return handler;
	}

	public handle(request: string): string {
		if (this.nextHandler) return this.nextHandler.handle(request);
		else return null;
	}
}

// Concrete handleers ==============================================

class MonkeyHandler extends AbstractHandler {
	public handle(request: string): string {
		if (request === 'Banana') return `Monkey: I'll eat the ${request}`;
		else return super.handle(request);// This will iterate trough the chain
	}
}

class SquirrelHandler extends AbstractHandler {
	public handle(request: string): string {
		if (request === 'Nut') return `Squirrel: I'll eat the ${request}`;
		else return super.handle(request);
	}
}

class DogHandler extends AbstractHandler {
	public handle(request: string): string {
		if (request === 'MeatBall') return `Dog I'll eat the ${request}`;
		else return super.handle(request);
	}
}

const clientCode_13 = (handler: Handler) => {
	const foods = ['Nut', 'Banana', 'Cup of coffee'];

	for (const food of foods) {
		console.log(`Client: Who wants a ${food}`);

		const result = handler.handle(food);
		if (result) console.log(`  ${food}  `);
		else console.log(`  ${food} was left untouched.`);
	}
};

const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

console.log(`Chain: Monkey > Squirrel > Dog\n`);
clientCode_13(monkey);
console.log('');

console.log(`Subchain: Squirrel > Dog\n`);
clientCode_13(squirrel);
