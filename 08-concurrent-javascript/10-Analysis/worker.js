const { parentPort } = require('worker_threads');
const template = require('./template.js');

const asyncOnMessageWrap = fn => async message =>
	parentPort.postMessage(await fn(message));

const commands = {
	renderLove: data => template.renderLove(data),
};

parentPort.on(
	'message',
	asyncOnMessageWrap(async ({ method, params, id }) => ({
		result: await commands[method](...params),
		id,
	})),
);
