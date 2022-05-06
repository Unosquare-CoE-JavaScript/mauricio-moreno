const fs = require('fs');

// The right functor will wrap again the data inside the functor object
// and allow to execute operations like map and mutate the data in a single dotline
const RightFunctor = value => ({
	map: fn => RightFunctor(fn(value)),
	log: () => {
		console.log(value);
		return RightFunctor(value);
	},
	fold: (fn, def) => def(value),
	chain: fn => fn(value),
});

// When At some point the data is sended to a left functor because of an error or a
// different is required, the left functor will skip the mutation of the data in a dotline flow
// and usually redirect the message "stored in value", to a final callback in the hold section
// and return something different usually an error
const LeftFunctor = value => ({
	map: fn => LeftFunctor(value),
	log: () => {
		console.log(value);
		return LeftFunctor(value);
	},
	fold: (fn, def) => fn(value),
	chain: fn => LeftFunctor(value),
});

// When the data passed here is falsy, a LeftFunctor is called which will skip all functions
// bellow a dotchain and will provide an error message (or null value) to the result of the flow
const fromNullable = x => (x != null ? RightFunctor(x) : LeftFunctor(null));

// When an erro happens Left functor will skip all the dotchain flow and send an error message
// But if everything is correct the right functor will wrap the data and allow to mutate the data in the way we want
const tryCatch = fn => {
	try {
		return RightFunctor(fn);
	} catch (error) {
		return LeftFunctor(error);
	}
};

const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}';

// Old way
const startApp_ = config => {
	const parsed = parseDbUrl(config);

	if (parsed) {
		[_, user, password, db] = parsed;
		return `starting ${db}, ${user}, ${password}`;
	} else return "can't get config";
};

// New way
const startApp = config =>
	RightFunctor(config) // Creates the functor
		.map(data => parseDbUrl(data))
		.chain(data => fromNullable(data)) // If the data is falsy return an error in the fold
		.map(([_, user, password, db]) => `starting ${db}, ${user}, ${password}`)
		.fold(
			error => error,// the first callback will be executed
			data => data,// But the data remains in the RightFunctor the second callback will be executed,
		);
