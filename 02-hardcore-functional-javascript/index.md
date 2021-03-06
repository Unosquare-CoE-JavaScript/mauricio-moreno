# Currying

In mathematics and computer science, currying is the technique of converting a function that takes
multiple arguments into a sequence of functions that each takes a single argument.

```js
const add = ([x, y]) => x + y;

// simple function that receives an undefined number of parameters and sum its value
const addMultiple = (...numbers) =>
	numbers.reduce((previous, current) => previous + current);

// simple curry that receives a function after you can pass the values
// of the parameters you want to pass
const curry =
	def =>
	([x, y]) =>
		def([x, y]);

const unCurry = f => (x, y) => f(x)(y);

// A curry function that passes an undefined number of parameters to another function
const multipleCurry =
	def =>
	(...args) =>
		def(...args);

const result = curry(add)([1, 2]);
const result2 = multipleCurry(addMultiple)(1, 2, 3, 4, 5);

console.log(result); // 3
console.log(result2); // 15
```

You can use currying to create templates to create another functions

```js
// As you see you can reuse the functions in another contexts
// not only use the isOdd final function in this example
const curry = def => x => y => def(x, y);

const module = curry((x, y) => y % x);

const isOdd = modulo(2);

const result = isOdd(33);

console.log(result); // false
```

# Currying Example & argumeent

```ts
// an implementation of the usage of the module
const module = curry((x, y) => y % x);

const isOdd = modulo(2);

// As you see in the curry implementation the order matters with the types you can see that
// the first parameter receives a function if you dont pass a function you'll break the program
const filter = curry((def: (element: number) => boolean, xs: Array<number>) =>
	xs.filter(def),
);

const getOdds = filter(isOdd);
```

In the last example we specified the types of the arguments, with this example
you can realize that the order matters when we use a curry function

The first time you create an istance, it would receive, or the arguments
or the function, and that impacts the behavior

> Also you can use the library ramda, it works also as the example we used

```ts
const { curry } = require('lambda');

const replace = curry((regex, replacement, str) =>
	str.replace(regex, replacement),
);

const replaceVowels = replace(/[AEIOU/ig], '')
```

# Ramda Generalized Currying

You can use the ramda library to create your own currying functions
that allow you to add parameters in each instance of the function you create

```ts
const { curry } = require('ramda');

const replace = curry((regex: RegExp, replacement: string, str: string) =>
	str.replace(regex, replacement),
);

// The first time you only use 2/3 of the parameters used but because we use curry from ramda}
// the code still works and waits us to add the third parameter to work
const replaceVowels = replace(/[AEIOU]/gi, '!');

// Here its called the first parameter
const result = replaceVowels('Hey I have words');

console.log(result);
```

Another example

```ts
const { curry } = require('ramda');

const addFourNumbers = (a: number, b: number, c: number, d: number) =>
	a + b + c + d;

const curriedAddFourNumbers = curry(addFourNumbers);
const f = curriedAddFourNumbers(1, 2);
const g = f(3);
g(4); //=> 10

// as you see the function will run after receives all parameters
```

> > You can also learn about partial application

# Currying Exercises solution

```js
// First Exercises
const { curry } = require('ramda');

// First we create a function that only split strings
const split = curry((delimiter, string) => string.split(delimiter));

// Second we define in which case it will split the string in this case in each word
const words = split(' ');

// After we can use the final word function to split strings and take its words
console.log(words('Jingle bells batman smells')); // => ['Jingle','bells','batman','smells']
// You can also use filter from ramda

//! Second exercise

const _keepHighest = (x, y) => (x >= y ? x : y);

//TODO: Rewrite max in its simplest form

// my response
const max = array => array.reduce(_keepHighest);

//teacher's response
const max = _.reduce(_keepHighest);

console.log(max([323, 523, 553, 123, 5234])); // => 5234

//! Third exercise
// my response
const slice = start => end => iterable => iterable.slice(start, end);
// Teacher's response
const slice = _.curry((start, end, iterable) => iterable.slice(start, end));
```

```js
// filtra todas las palabras con letra q

const _ = require('ramda');

const filterQs = _.filter(_.test(/q/gi));

console.log(filterQs(['quick', 'camels', 'quarry', 'over']));
```

## Second section

# composition

You can combine functions and with this you can create a sort like
pipes efect from elixir

```ts
value
	|> exclaim
	|> toUpper
	|> first
```

To do this you can see this example

```js
import { curry } from 'ramda';

// These are simple functions
const add = (x, y) => x + y;

const toUpper = string => string.toUpperCase();

const exlaim = string => string + '!';

const first = iterable => iterable[0];

// you can create your function or use ramda function
// const compose = (def, fn) => x => def(fn(x))

// You can create complex functions that are a chain of functions and its returned value
// For example in this case the first function is passed it is executed and its value is passed to the
//uper function
const loudFirst = compose(toUpper, first);
// after you can create another function that continues the flow described before and its returned value
// is passed to the function concat
const shout = compose(concat('!'), loudFirst);

console.log(shout('tears')); // => 'T!'
```

Also this is like dot.chaining

```js
const doStuff = str =>
	str
		.toLowerCase()
		.split(' ')
		.map(element => element.trim())
		.reverse()
		.filter(element => element.length > 3)
		.join('');

// same as the previous example you can see the order of the functions is reverted
const doStuff = _.compose(
	join(''),
	_.filter(x => x.length > 3),
	reverse,
	_map(trim),
	split(' '),
	toLowerCase,
);
```

# Practices

```js
// This function can be rewrited in this way
const isLastInStock = cars => {
	const reversedCars = _.last(cars);
	return _.prop('in_stock', reversedCars);
};

// first we get the last element, and get the value in stock
const isLastInStock = _.compose(_.prop('in_stock'), _.last);

// use _.compose(), _.prop() and _head() to retrieve the name
// of the first car

// first we get the fiqrst element in head and afther we retrieve the name value
const nameOfFirstCar = _.compose(_prop('name'), _.head);

// Use the helper function _average to refactor averageDollarValue
//as a composition

const _average = iterable => _.reduce(_, add, 0, iterable) / iterable.length; // <- leave be

const averageDollarValue = cars => {
	const dollar_values = _.map(element => element.dolar_value, cars);
	return _average(dollar_values);
};

// first we get the dollar value for the input afther pass the result of the map to the function average
const averageDollarValue = _.compose(
	_average,
	_.map(element => element.dolar_value),
);

// Write a function: sanitizeNames() using compose that returns a list
// of lowercase and underscored names:
// eg.: sanitizeNames(["Hello World]) //=> ["hello_world"]

const _underscore = _.replace(/\W+/g, '-'); // <- Leave this alone

// first take the value of name the result is passed to the underscore function and after we
// pass the value to the _.toLower Function
const sanitizeNames = _.compose(
	_.map(_.toLower),
	_.map(_undescore),
	_.map(_.prop('name')),
);

// Also you can do this

const sanitizeNames = _.map(_.compose(_.toLower, _underscore, _.prop('name')));
```

En el ultimo ejemplo el comportamiento es similar a esto

```js
compose(map(a), map(g)) == map(compose(a, g));
```

# Refactoring with Compose

```js
// Refactor availablePrices with compose

const availablePrices = cars => {
	const availableCars = _.filter(_.prop('in_stock'), cars);
	return availableCars
		.map(element => formatMoney(element.dollar_value))
		.join(', ');
};

const availablePrices = _.compose(
	_.join(', '),
	_.map(element => formatMoney(element.dollar_value)),
	_.filter(_.prop('in_stock')),
);

// Second example

const fastestCar = cars => {
	const sorted = _.sortBy(car => car.horsepower, cars);
	const fastest = _.last(sorted);
	return fastest.name + ' is the fastest';
};

const fastestCar = _.compose(
	_.flip(_.concat)(' is the fastest'),
	_.prop('name'),
	_.last,
	_.sortBy(_.prop('horsepower')),
);
```

# Functors

Functors works similarly to a composed function
or a elixir's pipe, it catches a value
and you can hold it and at the moment you are holding it
you can apply changes through functions with that value
and lastly return it.

For example we can reFactorize this function with a functor

```js
// This functor will envolve the value passed into an object, you can mutate the data
// in a dotchain sequence, but the function will not return the value of the data
// instead will return the object of the functor, you need to use the return function
// in this implementation to return the data
const Functor = value => ({
	map: fn => Functor(fn(value)),
	inspect: () => {
		console.log(value);
		return Functor(value);
	},
	return: () => value,
});

const nextCharForNumberString_ = str => {
	const trimmed = str.trim();
	const number = parseInt(trimmed);
	const nextNumber = newNumber(number + 1);
	return String.fromCharCode(nextNumber);
};

// This will be rewrited in this way
const nextCharForNumberString = string =>
	Functor(string)
		.map(string => string.trim())
		.map(trimmed => parseInt(trimmed, 10))
		.map(number => Number(number + 1))
		.map(String.fromCharCode).return;

console.log(nextCharForNumberString('   64 '));
```

Another example

```js
const first = iterable => iterable[0];

const halfTheFirstLargerNumber_ = iterable => {
	const found = iterable.filter(element => element >= 20);
	const answer = first(found) / 2;
	return `The answer is ${answer}`;
};

// This can be rewritted in this way
const halfTheFirstLargerNumber = iterable =>
	Functor(iterable)
		.map(element => element.filter(subelement => subelement >= 20))
		.map(element => first(element) / 2) // each returned value in a map function will be the next value taken
		.map(element => `The answer is ${element}`)
		.return();
```

# Exercises

Refactor all the functions bellow

```js
const moneyToFloat_ = string => parseFloat(string.replace(/\$/, ''));

const moneyToFloat = string =>
	Functor(string)
		.map(element => string.replace(/\$/, ''))
		.map(element => parseFlloat(element))
		.return();

const percentToFloat = string =>
	Functor(string)
		.map(element => element.replace(/\%/, ''))
		.map(element => parseFloat(element))
		.map(element => element * 0.01)
		.return();
```

This has a trick, it has two flows

```js
const applyDiscount = (price, discount) => {
	const cents = moneyToFloat(price);
	const savings = percentToFloat(discount);
	return cents - cents * savings;
};

// At the end of this function you'll need two values the values of cents and the values of savings
const applyDiscount = (price, discount) =>
	Functor(price) // Lets first get the value of cents
		.map(element => moneyToFloat(element))
		.map(cents => // here are the value of cents now we need the value of the savings
			Functor(discount)
				.map(element => percentToFloat(element)) // Here we get the value of the savings
				.map(savings => cents - cents * savings) // Now we return the interaction of the searched values
				.return(),
		)  // This can not work if you dont return a functor instead you return a value
		.return();
```

# Chaining functors

In the last example we see how to use nested functors to apply different values
we can faltten this element and get a more readable code

```js
const Functor = value => ({
	map: fn => Functor(fn(value)), // keeps the value inside the functor and changes it
	inspect: () => {
		// allows you to log the current value
		console.log(value);
		return Functor(value);
	},
	return: fn => value, // return the value
	chain: fn => fn(value), // if a function returns a functor this un-nest it
});

const applyDiscount = (price, discount) =>
	Functor(price)
		.map(element => moneyToFloat(element))
		.chain(cents =>
			Functor(discount)
				.map(element => percentToFloat(element))
				.map(savings => cents - cents * savings)
				// You dont need to return the value of the functor the functor will be unwrapped
				// because we are using chain function not map
		)
		.return();
```

# Either Monads

You can use this technique to manage the errors
and prevent errors of the type "cannot read property of undefined"

```js
// This will be called if everything is ok
const RightFunctor = value => ({
	map: fn => RightFunctor(fn(value)),
	inspect: () => {
		console.log(value);
		return RightFunctor(value);
	},
	fold: (fn, def) => def(value),
	return: fn => value,
	chain: fn => fn(value),
});

// This functor is called when an error happens and the value is not available
// after calling the left functor all the next functions will not mutate the value passed to the left functor
// and the left functor will return a different function in the fold method, this can be used to control
// the flow of the data or more commonly to report errors
const LeftFunctor = value => ({
	map: fn => LeftFunctor(value), // This will skip all the chained maps
	inspect: () => {
		console.log(value);
		return LeftFunctor(value);
	},
	fold: (fn, def) => fn(value), // This will execute fn that is an error handler
	return: fn => value,
	chain: fn => fn(value),
});

const findColor = name => {
	const found = {
		red: '#ff4444',
		blue: '#3b5998',
		yellow: '#fff6f8',
	}[name];
	// Return one case an error functor and in other not
	return found ? RightFunctor(found) : LeftFunctor('Missing ');
};

// If in findColor is a typo and there is not two kind of functors
// that will break your code because you cant read property map of undefined
// but after you use the functors you can handle the errors in the fold
// With two functions
console.log(
	findColor('redd')
		.map(element => element.toUpperCase())
		.fold(
			() => 'No color',
			color => color,
		),
);
```

We can wrap the function findColor with a fronNullable utility
that manages if the process goes ok or need to be passed an error functor

```js
const fromNullable = x => (x != null ? Rightfunctor(x) : LeftFunctor());

const findColor = name =>
	fromNullable(
		{
			red: '#ff4444',
			blue: '#3b5998',
			yellow: '#fff6f8',
		}[name],
	);
```

// Refactoring code

You can see another example using Monads

```js
const fs = require('fs');

const RightFunctor = value => ({
	map: fn => RightFunctor(fn(value)),
	inspect: () => {
		console.log(value);
		return RightFunctor(value);
	},
	fold: (fn, def) => def(value),
});

const LeftFunctor = value => ({
	map: fn => LeftFunctor(value),
	inspect: () => {
		console.log(value);
		return LeftFunctor(value);
	},
	fold: (fn, def) => fn(value),
});

// Here if a  nullish value is passed it will pass the flow of the data to a left functor
const fromNullable = x => (x != null ? Rightfunctor(x) : LeftFunctor());

//Here is happening something similar if an error happens the data received will be passed
// to a left functor
const tryCatch = fn => {
	try {
		return RightFunctor(fn());
	} catch (error) {
		return LeftFunctor(error);
	}
};

// ==========================================================
// Refactored code
const getPort_ = () => {
	try {
		const str = fs.readFileSync('config.json');
		const config = Json.parse(str);
		return config.port;
	} catch {
		return 3000;
	}
};

// First we geth the value of a fs function, and afther we catch the data
// if there is a success the data will flow normally along the pipes
// but if there was an error the left functor will be called and the data will be sended
// to the first fold method which in this case will return a default value of 8080
const getPort = () =>
	tryCatch(() => fs.readFileSync('config.json'))
		.map(contents => JSON.parse(contents))
		.map(config => config.port)
		.fold(
			() => 8080,
			x => x,
		);

console.log(getPort());
```

You can also create multiple try catch functions

```js
const RightFunctor = value => ({
	map: fn => RightFunctor(fn(value)),
	inspect: () => {
		console.log(value);
		return RightFunctor(value);
	},
	fold: (fn, def) => def(value),
	chain: fn => fn(value),
});

const LeftFunctor = value => ({
	map: fn => LeftFunctor(value),
	inspect: () => {
		console.log(value);
		return LeftFunctor(value);
	},
	fold: (fn, def) => fn(value),
	chain: fn => LeftFunctor(value),
});

const tryCatch = fn => {
	try {
		return RightFunctor(fn());
	} catch (error) {
		return LeftFunctor(error);
	}
};

const readFileSync = path => tryCatch(() => fs.readFileSync(path));

const parseJSON = contents => tryCatch(() => JSON.parse(contents));

// You need to be cautious when implements a functor function because it would not return a value
//instead another functor, in that cases you'll need to use a chain function
const getPort = () =>
	readFileSync('config.json')
		.chain(contents => parseJSON(contents)) // in map returns a functor, so you need to use chain
		.map(config => config.port)
		.fold(
			() => 8080,
			x => x,
		);
```

Due that parseJSON returns another functor, there will be a nested functor issue
because of that we need to use the chain function

Exercises refactorize the function using either monads

```js
const fs = require('fs');

const RightFunctor = value => ({
	map: fn => RightFunctor(fn(value)),
	inspect: () => {
		console.log(value);
		return RightFunctor(value);
	},
	fold: (fn, def) => def(value),
	chain: fn => fn(value),
});

const LeftFunctor = value => ({
	map: fn => LeftFunctor(value),
	inspect: () => {
		console.log(value);
		return LeftFunctor(value);
	},
	fold: (fn, def) => fn(value),
	chain: fn => LeftFunctor(value),
});

const fromNullable = x => (x != null ? RightFunctor(x) : LeftFunctor());

const tryCatch = fn => {
	try {
		return RightFunctor(fn);
	} catch (error) {
		return LeftFunctor(error);
	}
};

const user = { address: { street: { name: 'willow' } } };

const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}';

//=============================================================
const street_ = user => {
	const address = use.address;
	return address ? address.street : 'no street';
};

// first we get the address of the parameter
// second verify if it is null
// after we get the street of the data and return the value
const street = ({ address }) =>
	fromNullable(address)
		.map(data => data.street)
		.fold(
			() => 'no street',
			data => data,
		);

console.log(street(user));

// Second ##################################################

const streetName_ = ({ address }) => {
	if (address) {
		const { street } = address;
		if (street) return street.name;
	} else return 'no street';
};

// First we get the address
const streetName = ({ address }) =>
	fromNullable(address) // verifies if it is nullable
		.chain(data => fromNullable(data.street)) //verifies if street exists
		.chain(data => fromNullable(data.name)) // verifies if name exits
		.fold(
			() => 'error',
			data => data,
		);

console.log(streetName(user));

// Third ####################################################
const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}';

const parseDbUrl_ = config => {
	try {
		const json = JSON.parse(config);
		return json.url.match(DB_REGEX);
	} catch {
		return null;
	}
};

const parseDbUrl = config =>
	RightFunctor(config) 
		.chain(data => tryCatch(JSON.parse(data))) // tries to parse the data if doesnt work throw error
		.chain(data => data.url.match(DB_REGEX)) // verifies if match with a regex
		.fold(
			error => error,
			data => data,
		);

// Fourth #################################################

const startApp_ = config => {
	const parsed = parseDbUrl(config);

	if (parsed) {
		[_, user, password, db] = parsed;
		return `starting ${db}, ${user}, ${password}`;
	} else return "can't get config";
};

const startApp = config =>
	RightFunctor(config)
		.map(parseDbUrl) // first parses the data
		.chain(fromNullable) // verifies if it returns a nullable value
		.map(([_, user, password, db]) => `starting ${db}, ${user}, ${password}`) // creates a message string
		.fold(
			error => error,
			data => data,
		);
```

# Node exercise

This is an example of how you can refactor a nodejs program

```js
const { Task } = require('./Types');
const fs = require('fs');

// ====================================================
const app = () =>
	fs.readFile('config.json', 'utf-8', (err, contents) => {
		console.log(err, contents);
		if (err) throw err;

		const newContents = contents.replace(/3/g, '6');

		fs.writeFile('config1.json', newContents, (err, _) => {
			if (err) throw err;
			console.log('success!');
		});
	});

app();

// The solution is bellow
```

# Task monad

A task monad takes a function instead a value and returns a functor with that function

```js
import { compose } from 'ramda';

const Functor = fn => ({
	map: def => Functor(compose(fn, def)),
	fold: fn,
});

Functor(() => 2)
	.map(two => two + 1)
	.fold();
```

utilizando la utilidad de Task puedes refactorizar el codigo de la siguiente manera

```js
const { Task } = require('./Types');
const fs = require('fs');

// When a Task Monad is created it allows you to pass a promise-like function as parameter
// you can return a reject or response callback that will return a Right or Left functor and
// change the flow of the program
const readFile = (path, encoding) =>
	Task((reject, response) =>
		fs.readFileSync(path, encoding, (error, contents) =>
			error ? reject(error) : response(contents),
		),
	);

const writeFile = (path, contents) =>
	Task((reject, response) =>
		fs.readFile(path, contents, (error, contents) =>
			error ? reject(error) : response(contents),
		),
	);

const app_ = () =>
	fs.readFile('config.json', 'utf-8', (err, contents) => {
		console.log(err, contents);
		if (err) throw err;

		const newContents = contents.replace(/3/g, '6');

		fs.writeFile('config1.json', newContents, (err, _) => {
			if (err) throw err;
			console.log('success!');
		});
	});

// HEre we started the app
const app = () =>
	readFile('config.json', 'utf-8')// Pass the data to the read file function and returns a functor
		.map(data => data.replace(/3/g, '6')) // replace the string
		.chain(data => writeFile('config1.json', data)); // and after returns the reult of another functor in the writeFile function

app().fork(console.error, () => console.log('sucess'));
```

Here are some examples of Task monad

```js
// SETUP
const posts = { 1: { title: 'first' }, 2: { title: 'second' } };
const comments = { First: [{ id: 1, body: 'Brilliant' }], Second: [{id: 2, body: "Unforgivable"}]};

const getPost = id =>
	new Task((reject, response) =>
		setTimeout(
			() => (posts[id] ? response(posts[id]) : reject('not found')),
			2000,
		),
	);

const getComments = post =>
	new Task((reject, response) =>
		setTimeout(() => response(comments[post.title]), 200),
	);

// ##################################################
const posts = { 1: { title: 'first' }, 2: { title: 'second' } };
const comments = {First: [{id: 1, body: "brilliant"}, Second: [{id: 2, body: "unforgivable"}]]}

// Ex1: Use the result of getPost() and upperCase the title.
const postTitle = id => getPost(id).map(data => data.title.toUpperCase());

// Ex2: pass in the post to getComments(), define above, then assign the returned comments to the post

const commentsForPost = id =>
	getPost(id).chain(post =>
		getComments(post).map(comments => Object.assign({ comments, post })),
	);

// Ex3: Wrap location.href in a Task to make it pure

const getHref = new Task((reject, response) =>
	response(location.href)
)
```

