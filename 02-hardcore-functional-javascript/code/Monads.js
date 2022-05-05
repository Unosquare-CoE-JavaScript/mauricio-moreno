const { Task } = require('./Types');

const t1 = Task((reject, response) => response(2))
	.map(two => two + 1)
	.map(three => three * 2);

t1.fork(console.error, console.log);
