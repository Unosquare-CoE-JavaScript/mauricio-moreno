const fs = require('fs');

const RightFunctor = value => ({
	map: fn => RightFunctor(fn(value)),
	log: () => {
		console.log(value);
		return RightFunctor(value);
	},
	fold: (fn, def) => def(value),
	chain: fn => fn(value),
});

const LeftFunctor = value => ({
	map: fn => LeftFunctor(value),
	log: () => {
		console.log(value);
		return LeftFunctor(value);
	},
	fold: (fn, def) => fn(value),
	chain: fn => LeftFunctor(value),
});

const fromNullable = x => (x != null ? RightFunctor(x) : LeftFunctor(null));

const tryCatch = fn => {
	try {
		return RightFunctor(fn);
	} catch (error) {
		return LeftFunctor(error);
	}
};

const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}';

const startApp_ = config => {
	const parsed = parseDbUrl(config);

	if (parsed) {
		[_, user, password, db] = parsed;
		return `starting ${db}, ${user}, ${password}`;
	} else return "can't get config";
};

const startApp = config =>
	RightFunctor(config)
		.map(data => parseDbUrl(data))
		.chain(data => fromNullable(data))
		.map(([_, user, password, db]) => `starting ${db}, ${user}, ${password}`)
		.fold(
			error => error,
			data => data,
		);
