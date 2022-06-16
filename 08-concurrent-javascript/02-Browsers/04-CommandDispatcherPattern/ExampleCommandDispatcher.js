const commands = {
	square_sum: max => {
		let sum = 0;
		for (let i = 0; i < max; i++) sum + Math.sqrt(i);
		return sum;
	},
	fibonacci: limit => {
		let prev = 1n,
			next = 0n,
			swap;
		while (limit) {
			swap = prev;
			prev = prev + next;
			next = swap;
			limit--;
		}
		return String(next);
	},
};

// This function allows you to find the searched function without throw an accidental error
// The name in the function is in the object commands and it can receive the arguments;
export function dispatch(method, args) {
	if (commands.hasOwnProperty(method)) return commands[method](...args);
	else throw new TypeError(`Command ${method} is not defined!`);
}

