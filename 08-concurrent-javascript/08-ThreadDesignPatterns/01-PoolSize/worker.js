/*This file will be called from the rcp worker that will manage how we wil use this
thread */
const { parentPort } = require('worker_threads');

const asyncOnMessageWrap = fn => async message =>
	parentPort.postMessage(await fn(message));

//These are the available operations
const commands = {
	square_sum: async max => {
		await new Promise(response => setTimeout(response, 100));
		let sum = 0;
		for (let i = 0; i < max; i++) sum += Math.sqrt(i);
		return sum;
	},
};

//Rcp-worker sends the method and the params of the strategy in its exec method
parentPort.on(
	'message',
	asyncOnMessageWrap(async ({ method, params, id }) => ({
		result: await commands[method](...params),
		id,
	})),
);

