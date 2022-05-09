const { Task } = require('./Types');

// A task monad will create a promise as first parameter, if you reject it it would return a Left Functor
// But if a response callback is called it would return a RightFunctor which will continue the dotchain,
// And will alow us to continue mutating the data
const t1 = Task((reject, response) => response(2))
	.map(two => two + 1)
	.map(three => three * 2)
	.hold(
		error => error,
		data => data
	)

t1.fork(console.error, console.log);
