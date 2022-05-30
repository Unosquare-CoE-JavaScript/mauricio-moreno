// The command interfface declares a method for executing a command
// Interface =========================================================
interface Command {
	execute(): void;
}

// Some commands an implement simple operations on their own
class SimpleCommand implements Command {
	private payload: string;

	constructor(payload: string) {
		this.payload = payload;
	}

	public execute(): void {
		console.log(
			`SimpleCommand: See, I can do simple things like printing (${this.payload})`,
		);
	}
}

/**
 * However, some commands can delegate more complex operations to other objects,
 * called "receivers."
 */
class ComplexCommand implements Command {
	private receiver: Receiver;
	// context data, required for launching the receiver's methods
	private a: string;
	private b: string;

	/**
	 * Complex commands can accept one or several receiver objects along with
	 * any context data via the constructor.
	 */
	constructor(receiver: Receiver, a: string, b: string) {
		this.receiver = receiver;
		this.a = a;
		this.b = b;
	}

	// Commands can delegate to any methods of a receiver
	public execute(): void {
		this.receiver.doSomething(this.a);
		this.receiver.doSomethingElse(this.b);
	}
}

/**
 * The Receiver classes contain some important business logic. They know how to
 * perform all kinds of operations, associated with carrying out a request. In
 * fact, any class may serve as a Receiver.
 */
// Receiver ===================================================================
class Receiver {
	public doSomething(a: string): void {
		console.log(`Receiver working on ${a}`);
	}

	public doSomethingElse(b: string): void {
		console.log(`Receiver: Also working on (${b})`);
	}
}

/**
 * The Invoker is associated with one or several commands. It sends a request to
 * the command.
 */
// Invoker ====================================================================
// This is the main object that has the supervision of the problem
class Invoker {
	// These are subtasks more specialized
	private onStart: Command;
	private onFinish: Command;

	public setOnStart(command: Command): void {
		this.onStart = command;
	}
	public setOnFinish(command: Command): void {
		this.onFinish = command;
	}

	/**
	 * The Invoker does not depend on concrete command or receiver classes. The
	 * Invoker passes a request to a receiver indirectly, by executing a
	 * command.
	 */
	public doSomethingImportant(): void {
		console.log('Invoker: Does anybody want something done before I begin?');
		if (this.isCommand(this.onStart)) this.onStart.execute();

		console.log('Invoker: ...doing something really important...');

		console.log('Invoker: Does anybody want something done after I finish');
		if (this.isCommand(this.onFinish)) this.onFinish.execute();
	}

	//! Verifies if the object is available
	private isCommand(object): object is Command {
		return object.execute !== undefined;
	}
}

// The client code can parameterize an invoker with any commands
// Clientcode ================================================================
const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand('Say hi!'));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save Report'));

invoker.doSomethingImportant();
