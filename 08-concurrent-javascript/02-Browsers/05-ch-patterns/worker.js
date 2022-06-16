// An artificial slowdown to the methods
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Converts onmessages in async functions
function asyncOnMessageWrap(fn) {
	return async message => {
		postMessage(await fn(message.data));
	};
}

const commands = {
	square_sum: async max => {
		await sleep(Math.random() * 100); // fake aleatory number slow down
		let sum = 0;
		for (let i = 0; i < max; i++) sum += Math.sqrt(i);
		return sum;
	},
	fibonacci: async limit => {
		await sleep(Math.random() * 100);
		let prev = 1n,
			next = 0n,
			swap;
		while (limit) {
			swap = prev;
			prev = prev + next;
			next = swap;
			limit--;
		}
		return String(next); // Prevents bigint related errors
	},
	async bad() {
		await sleep(Math.random() * 10);
		throw new Error('Oh no');
	},
};

// Here we use the async function wrapper
self.onmessage = asyncOnMessageWrap(async rcp => {
	const { method, params, id } = rcp;

	if (commands.hasOwnProperty(method)) {
		try {
			const result = await commands[method](...params);
			return { id, result }; // returns a successful function result and its id
		} catch (error) {
			return { id, error: { code: -32000, message: error.message } };
		}
	} else
		return {
			id,
			error: {
				code: -32601,
				message: `method ${method} not found!`,
			},
		};
});
