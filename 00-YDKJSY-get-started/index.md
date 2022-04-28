## Chapter 1: What is javascript

# What's with that name?

When Brendan Eich first conceived of the lan-
guage, he code-named it Mocha But when it came time to publicly
name the language, “JavaScript” won the vote.

JavaScript was a marketing ploy to try to
position this language as a palatable alternative to writing the
heavier and more well-known Java of the day.

mark, the official name of the language specified by TC39
and formalized by the ECMA standards body is ECMAScript.

In other words, the JavaScript/JS that runs in your browser or
in Node.js, is an implementation of the ES2019 standard.

JS’s syntax and behavior are defined in the ES specification.

TC39 meets generally about every other month, usually for
about three days, to review work done by members since the
last meeting, discuss issues, and vote on proposals. Meeting
locations rotate among member companies willing to host.
All TC39 proposals progress through a five-stage process—
of course, since we’re programmers, it’s 0-based!—Stage 0
through Stage 4. You can read more about the Stage process
here: https://tc39.es/process-document/

Once a proposal reaches “Stage 4” status, it is eligible to be
included in the next yearly revision of the language.

TC39 planned to add a contains(..) method for
Arrays, but it was found that this name conflicted with old
JS frameworks still in use on some sites, so they changed
the name to a non-conflicting includes(..)

# Not all web is JS

```js
alert('Hello, JS!');
```

The alert(..) function
shown here is not included in the JS specification, but it is in
all web JS environments.

In fact, a wide range of JS-looking APIs, like fetch(..) ,
getCurrentLocation(..) , and getUserMedia(..) , are all
web APIs that look like JS. In Node.js, we can access hun-
dreds of API methods from various built-in modules, like
fs.write(..) .

The behaviors behind them are
controlled by the environment running the JS engine

So an alert(..) call is JS, but alert itself is really just a
guest, not part of the official JS specification.

# Backwards and Forwards

- Backwards compatibility means that once something is ac-
  cepted as valid JS, there will not be a future change to
  the language that causes that code to become invalid JS.
  Code written in 1995—however primitive or limited it may
  have been!—should still work today. As TC39 members often
  proclaim, “we don’t break the web!”

* Being forwards-compatible means that
  including a new addition to the language in a program would
  not cause that program to break if it were run in an older
  JS engine.

> Markup (HTML) or styling (CSS) are
> declarative in nature, so it’s much easier to “skip over” un-
> recognized declarations with minimal impact to other recoged declarations.

> If you run a program that uses
> an ES2019 feature in an engine from 2016, you’re very likely
> to see the program break and crash.

- For new and incompatible syntax, the solution is transpiling.

For example, a developer may write a snippet of code like

```js
if (something) {
	let x = 3;
	console.log(x);
} else {
	let x = 4;
	console.log(x);
}
```

Babel Transpiler might convert that
code to look like this:

```js
var x$0, x$1;
if (something) {
	x$0 = 3;
	console.log(x$0);
} else {
	x$1 = 4;
	console.log(x$1);
}
```

# Filling the Gaps

If the forwards-compatibility issue is not related to new
syntax, but rather to a missing API method that was only
recently added, the most common solution is to provide a
definition for that missing API method that stands in and
acts as if the older environment had already had it natively
defined. This pattern is called a polyfill (aka “shim”).

```js
// getSomeRecords() returns us a promise for some
// data it will fetch
var pr = getSomeRecords();
// show the UI spinner while we get the data
startSpinner();
pr.then(renderRecords).catch(showError).finally(hideSpinner);
```

This code uses an ES2019 feature, the finally(..) method
on the promise prototype. If this code were used in a pre-
ES2019 environment, the finally(..) method would not
exist, and an error would occur.

A polyfill for finally(..) in pre-ES2019 environments could
look like this:

```js
if (!Promise.prototype.finally) {
	Promise.prototype.finally = function f(fn) {
		return this.then(
			function t(v) {
				return Promise.resolve(fn()).then(function t() {
					return v;
				});
			},
			function c(e) {
				return Promise.resolve(fn()).then(function t() {
					throw e;
				});
			},
		);
	};
}
```

> Always use a robust, official polyfill wher-
> ever possible, such as the collection of polyfill-
> s/shims in ES-Shim.

Occasionally you may need to include/define them explicitly,
which works similar to the snippet we just looked at.

Transpilation and polyfilling are two highly effective tech-
niques for addressing that gap between code that uses the
latest stable features in the language and the old environments

# What's an Interpretation?

Historically, scripted or interpreted languages were executed
in generally a top-down and line-by-line fashion

In scripted or interpreted languages, an error on line 5 of a
program won’t be discovered until lines 1 through 4 have
already executed.

In this processing model, an invalid command (such as broken
syntax) on line 5 would be caught during the parsing phase,
before any execution has begun, and none of the program
would run.

In classic compilation theory, the last
remaining step after parsing is code generation: producing an
executable form.

Once any source program has been fully parsed, it’s very
common that its subsequent execution will, in some form or
fashion, include a translation from the parsed form of the
program—usually called an Abstract Syntax Tree (AST)—to
that executable form

- JS source code is parsed before it is executed.

The parsed JS is converted
to an optimized (binary) form, and that “code” is subse-
quently executed

To be specific, this “compilation” produces a binary byte code
(of sorts), which is then handed to the “JS virtual machine”

1. After a program leaves a developer’s editor, it gets tran-
   spiled by Babel, then packed by Webpack (and perhaps
   half a dozen other build processes), then it gets delivered
   in that very different form to a JS engine.
2. The JS engine parses the code to an AST.
3. Then the engine converts that AST to a kind-of byte
   code, a binary intermediate representation (IR), which
   is then refined/converted even further by the optimizing
   JIT compiler.
4. Finally, the JS VM executes the program.

And again, the reason that matters is, since JS is compiled,
we are informed of static errors (such as malformed syntax)
before our code is executed.

## Chapter 2 Sruveying JS

# Each File is a Program

In JS, each standalone file is its own separate program.
This is because if one file can fail, and that will not necessarily
prevent the next file from being processed. the overall application will probably only partially operate, at
best.

- Many projects use build process tools, When
  this happens, JS treats this single combined file
  as the entire program.

The only way multiple standalone .js files act as a single
program is by sharing their state (and access to their public functionality) via the “global scope.” They mix together in this
global scope namespace, so at runtime they act as as whole.

Modules are also
file-based. If a file is loaded via module-loading mechanism
such as an import statement or a < script type=module>
tag, all its code is treated as a single module.

- importing a module into another allows runtime interoperation between them

# Values

Values are data. They’re how the program maintains
state. Values come in two forms in JS: primitive and object.

- For example "My name is Kyle." is a primitive string literal

```js
const firstName = 'Kyle';
console.log('My name is ${ firstName }.');
// My name is ${ firstName }.
console.log('My name is ${ firstName }.');
// My name is ${ firstName }.
console.log(`My name is ${firstName}.`);
// My name is Kyle.
```

In addition to strings, numbers, and booleans, two other
primitive values in JS programs are null and undefined both values serve the
purpose of indicating emptiness (or absence) of a value.

---

The final primitive are Symbols, Symbols are almost exclusively used as special keys on objects

```js
hitchhikersGuide[Symbol('meaning of life')];
// 42
```

You won’t encounter direct usage of symbols very often in
typical JS programs. They’re mostly used in low-level code
such as in libraries and frameworks.

# Arrays and Objects

Besides primitives, the other value type in JS is an object
value.

```js
names = ['Frank', 'Kyle', 'Peter', 'Susan'];
names.length;
// 4
names[0];
// Frank
names[1];
```

> Js arrays can hold any value even functions!

- Functions like arrays are a special kind of object

Objects are more general an unordered keyed collection of values, you access the element by
a string location

```js
name = {
	first: 'Kyle',
	last: 'Simpson',
	age: 39,
	specialties: ['JS', 'Table Tennis'],
};
console.log(`My name is ${name.first}.`);
```

# Value Type Determination

For distinguishing values, the typeof operator tells you its
built-in type, if primitive, or "object" otherwise:

```js
typeof 42; // number
typeof 'abc'; // string
typeof undefined; // undefined
typeof true; // boolean
typeof null; //!!! object
typeof { a: 1 }; // object
typeof function hello() {}; //!! function
```

> Converting from one value to another is referred as coertion

# Declaring and using variables

Values can either appear as literal values or they can be held in variables

Variables have to be declared (created) to be used

```js
var name = 'Kyle';
var age;
```

> let allows a more limited access to the variable than var .

```js
var adult = true;
if (adult) {
	var name = 'Kyle';
	let age = 39;
	console.log('Shhh, this is a secret!');
}
console.log(name);
// Kyle
console.log(age);
// Error!
```

Block-scoping is very useful for limiting how widespread
variable declarations are in our programs, which helps pre-
vent accidental overlap of their names.

> > It’s very common to suggest that var should be
> > avoided in favor of let (or const !), generally
> > because of perceived confusion over how the
> > scoping behavior of var has worked since the be-
> > ginning of JS. I believe this to be overly restrictive
> > advice and ultimately unhelpful. It’s assuming
> > you are unable to learn and use a feature properly
> > in combination with other features. I believe you
> > can and should learn any features available, and
> > use them where appropriate!

---

A third declaration form is const. it must be given a value at the
moment it’s declared, and cannot be re-assigned a different
value later.

```js
const myBirthday = true;
let age = 39;
if (myBirthday) {
	age = age + 1;
	// OK!
	myBirthday = false; // Error!
}
```

> > The myBirthday constant is not allowed to be re-assigned.
> > const declared variables are not “unchangeable”, they just
> > cannot be re-assigned. It’s ill-advised to use const with object
> > values, because those values can still be changed even though
> > the variable can’t be re-assigned. This leads to potential
> > confusion down the line, so I think it’s wise to avoid situations
> > like:

```js
const actors = ['Morgan Freeman', 'Jennifer Aniston'];
actors[2] = 'Tom Cruise';
actors = [];
// OK :(
// Error!
```

The best semantic use of a const is when you have a simple
primitive value that you want to give a useful name to, such
as using myBirthday instead of true . This makes programs
easier to read.

> If you stick to using const only with primitive
> values, you avoid any confusion of re-assignment
> (not allowed) vs. mutation (allowed)! That’s the
> safest and best way to use const .

---

Besides var / let / const , there are other syntactic forms that
declare identifiers (variables) in various scopes. For example:

```js
function hello(name) {
	console.log(`Hello, ${name}.`);
}
hello('Kyle');
// Hello, Kyle.
```

The identifier hello is created in the outer scope, and it’s also
automatically associated so that it references the function. But
the named parameter name is created only inside the function,
and thus is only accessible inside that function’s scope. hello
and name generally behave as var -declared.

- Another syntax that declares a variable is a catch clause:

```js
try {
	someError();
} catch (err) {
	console.log(err);
}
```

# Functions

In JS, we should consider “function” to take the broader
meaning of another related term: “procedure.” A procedure
is a collection of statements that can be invoked one or more
times, may be provided some inputs, and may give back one
or more outputs.

```js
function awesomeFunction(coolThings) {
	// ..
	return amazingStuff;
}

const awesomeFunction2 = function (coolThings) {
	// ..
	return amazingStuff;
};

const awesomeFunction3 = coolThings => amazingStuff;
```

This is called a function declaration because it appears as a
statement by itself, not as an expression in another statement.

The second function is an expression that is assigned to the variable
awesomeFunction2 . Different from the function declaration
form, a function expression is not associated with its identifier
until that statement during runtime.

- functions are values that can be assigned and passed around

You can only return a single value, but if you have more val-
ues to return, you can wrap them up into a single object/array.
Since functions are values, they can be assigned as properties
on objects

```js
var whatToSay = {
	greeting() {
		console.log('Hello!');
	},
	question() {
		console.log("What's your name?");
	},
	answer() {
		console.log('My name is Kyle.');
	},
};
whatToSay.greeting(); // Hello
```

# Comparisons

we must be aware of the nuanced differences between
an equality comparison and an equivalence comparison.

most values participating in an === equality comparison
will fit with that exact same intuition.

```js
3 === 3.0; // true
'yes' === 'yes'; // true
null === null; // true
false === false; // true

42 === '42'; // false
'hello' === 'Hello'; // false
true === 1; // false
0 === null; // false
'' === null; // falsej
null === undefined; // false
```

> Another way === ’s equality comparison is often
> described is, “checking both the value and the
> type”

- The === operator is designed to lie in two cases of special values: NaN and -0 .

```js
NaN === NaN; // false
0 === -0; // true
```

it’s best to avoid using === for them. For NaN comparisons,
use the Number.isNaN(..) or -0 comparison, use the Object.is(..)

> Humorously, you could think of
> Object.is(..) as the “quadruple-equals” ==== , the really-
> really-strict comparison!

---

```js
[ 1, 2, 3 ] === [ 1, 2, 3 ];  // false
{ a: 42 } === { a: 42 }       // false
(x => x * 2) === (x => x * 2) // false
```

it may seem reasonable to assume that an equality check
considers the nature or contents of the value But when
it comes to objects, a content-aware comparison is generally
referred to as “structural equality.”

- JS does not define === as structural equality for object values.
  Instead, === uses identity equality for object values.

- In JS, all object values are held by reference

```js
var x = [1, 2, 3];
// assignment is by reference-copy, so
// y references the *same* array as x,
// not another copy of it.
var y = x;
y === x; // false
y === [1, 2, 3]; // false
x === [1, 2, 3]; // false
```

# Coercive Comparisons

Coercion means a value of one type being converted to its
respective representation in another type

> the broader JS community
> than the == operator, generally referred to as the “loose
> equality” operator.

a deeper problem is the extremely widespread misconception that it
performs its comparisons without considering the types of its
compared values.

- Both of the operators consider the type of the values being compared

If the value types being compared are different, the == differs
from === in that it allows coercion before the comparison.

> the == operator should be described as “coercive equality.”

```js
42 == '42'; //true
1 == true; //true
```

the == causes the non-number values ( "42" and true ) to be
converted to numbers and prefers primitive and numeric comparisons

---

< , > (and even <= and >= ). Just like == , these operators will perform as if they’re “strict”
if the types being relationally compared already match, but they’ll allow coercion first (generally, to numbers) if the types
differ.

```js
var arr = ['1', '10', '100', '1000'];
for (let i = 0; i < arr.length && arr[i] < 500; i++) {
	// will run 3 times
}
```

The `arr[i] < 500` invokes coercion, though, because the `arr[i]` values
are all strings.

These relational operators typically use numeric comparisons,
except in the case where both values being compared are
already strings; in this case, they use alphabetical (dictionary-
like) comparison of the strings:

```js
'10' < '9'; // true
```

# How We Organize in js

Two major patterns for organizing code (data and behavior)
are used broadly across the JS ecosystem: classes and modules.

## Classes

---

A class in a program is a definition of a “type” of custom
data structure that includes both data and behaviors that
operate on that data. Classes define how such a data structure
works, but classes are not themselves concrete values. To get
a concrete value that you can use in the program, a class must
be instantiated (with the new keyword) one or more times.

```js
class Page {
	constructor(text) {
		this.text = text;
	}
	print() {
		console.log(this.text);
	}
}
class Notebook {
	constructor() {
		this.pages = [];
	}
	addPage(text) {
		var page = new Page(text);
		this.pages.push(page);
	}
	print() {
		for (let page of this.pages) {
			page.print();
		}
	}
}
var mathNotes = new Notebook();
mathNotes.addPage('Arithmetic: + - * / ...');
mathNotes.addPage('Trigonometry: sin cos tan ...');
mathNotes.print();
```

The same program could have
been built without any class definitions, but it would likely
have been much less organized, harder to read and reason
about, and more susceptible to bugs and subpar maintenance.

# class inheritance

```js
class Publication {
	constructor(title, author, pubDate) {
		this.title = title;
		this.author = author;
		this.pubDate = pubDate;
	}
	print() {
		console.log(`
Title: ${this.title}
By: ${this.author}
${this.pubDate}
`);
	}
}

class Book extends Publication {
	constructor(bookDetails) {
		super(bookDetails.title, bookDetails.author, bookDetails.publishedOn);
		this.publisher = bookDetails.publisher;
		this.ISBN = bookDetails.ISBN;
	}
	print() {
		super.print();
		console.log(`Publisher: ${this.publisher}
	ISBN: ${this.ISBN}
	`);
	}
}
class BlogPost extends Publication {
	constructor(title, author, pubDate, URL) {
		super(title, author, pubDate);
		this.URL = URL;
	}
	print() {
		super.print();
		console.log(this.URL);
	}
}

var YDKJS = new Book({
	title: "You Don't Know JS",
	author: 'Kyle Simpson',
	publishedOn: 'June 2014',
	publisher: "O'Reilly",
	ISBN: '123456-789',
});
YDKJS.print();
// Title: You Don't Know JS
// By: Kyle Simpson
// June 2014
// Publisher: O'Reilly
// ISBN: 123456-789
var forAgainstLet = new BlogPost(
	'For and against let',
	'Kyle Simpson',
	'October 27, 2014',
	'https://davidwalsh.name/for-and-against-let',
);
forAgainstLet.print();
// Title: For and against let
// By: Kyle Simpson
// October 27, 2014
// https://davidwalsh.name/for-and-against-let
```

Notice that both child class instances have a print() method,
which was an override of the inherited print() method from
the parent Publication class.

- The fact that both the inherited and overridden methods can
  have the same name and co-exist is called polymorphism.

# Modules

The module pattern has essentially the same goal as the
class pattern, which is to group data and behavior together
into logical units. Also like classes, modules can “include”
or “access” the data and behaviors of other modules, for
cooperation sake.

## Classic Modules

---

The key hallmarks of a classic module are an outer function
(that runs at least once), which returns an “instance” of the
module with one or more functions exposed that can operate
on the module instance’s internal (hidden) data.

```js
function Publication(title, author, pubDate) {
	var publicAPI = {
		print() {
			console.log(`
	Title: ${title}
	By: ${author}
	${pubDate}
	`);
		},
	};
	return publicAPI;
}
function Book(bookDetails) {
	var pub = Publication(
		bookDetails.title,
		bookDetails.author,
		bookDetails.publishedOn,
	);
	var publicAPI = {
		print() {
			pub.print();
			console.log(`
	Publisher: ${bookDetails.publisher}
	ISBN: ${bookDetails.ISBN}
	`);
		},
	};
	return publicAPI;
}
function BlogPost(title, author, pubDate, URL) {
	var pub = Publication(title, author, pubDate);
	var publicAPI = {
		print() {
			pub.print();
			console.log(URL);
		},
	};
	return publicAPI;
}
var YDKJS = Book({
	title: "You Don't Know JS",
	author: 'Kyle Simpson',
	publishedOn: 'June 2014',
	publisher: "O'Reilly",
	ISBN: '123456-789',
});
YDKJS.print();
// Title: You Don't Know JS
// By: Kyle Simpson
// June 2014
// Publisher: O'Reilly
// ISBN: 123456-789
var forAgainstLet = BlogPost(
	'For and against let',
	'Kyle Simpson',
	'October 27, 2014',
	'https://davidwalsh.name/for-and-against-let',
);
forAgainstLet.print();
// Title: For and against let
// By: Kyle Simpson
// October 27, 2014
// https://davidwalsh.name/for-and-against-let
```

With class , the “API” of an instance is implicit in the class
definition—also, all data and methods are public. With the
module factory function, you explicitly create and return an
object with any publicly exposed methods, and any data or
other unreferenced methods remain private inside the factory
function.

There are other variations to this factory function AMD (Asynchronous
Module Definition), UMD (Universal Module Definition)

# ES Modules

ES modules (ESM) are meant to serve much the same spirit and purpose as the
existing classic modules.

- First, there’s no wrapping function to define a module. The
  wrapping context is a file. ESMs are always file-based; one
  file, one module.

* Second uses the export keyword to add a variable or
  method to its public API definition

* Third you don’t “instantiate” an ES module, you
  just import it to use its single instance. ESMs are, in effect,
  “singletons,” in that there’s only one instance ever created
  > If your
      module needs to support multiple instantiations, you have to
      provide a classic module-style factory function on your ESM
      definition for that purpose.

```js
function printDetails(title, author, pubDate) {
	console.log(`
Title: ${title}
By: ${author}
${pubDate}
`);
}
export function create(title, author, pubDate) {
	var publicAPI = {
		print() {
			printDetails(title, author, pubDate);
		},
	};
	return publicAPI;
}
```

To import and use this module, from another ES module like
blogpost.js :

```js
import { create as createPub } from 'publication.js';
function printDetails(pub, URL) {
	pub.print();
	console.log(URL);
}
export function create(title, author, pubDate, URL) {
	var pub = createPub(title, author, pubDate);
	var publicAPI = {
		print() {
			printDetails(pub, URL);
		},
	};
	return publicAPI;
}
```

And finally, to use this module, we import into another ES
module like main.js :

```js
import { create as newBlogPost } from 'blogpost.js';
var forAgainstLet = newBlogPost(
	'For and against let',
	'Kyle Simpson',
	'October 27, 2014',
	'https://davidwalsh.name/for-and-against-let',
);
forAgainstLet.print();
// Title: For and against let
// By: Kyle Simpson
// October 27, 2014
// https://davidwalsh.name/for-and-against-let
```

## Chapter 3: Digging to the Roots of JS

# Iteration

The iterator pattern has been around for decades, and suggests
a “standardized” approach to consuming data from a source
one chunk at a time.

if a query has 100 or 1,000 (or more!) rows, you’ll need
iterative processing to deal with this data (typically, a loop).

The iterator pattern defines a data structure called an “iter-
ator” that has a reference to an underlying data source (like
the query result rows), which exposes a method like next() .
Calling next() returns the next piece of data (i.e., a “record”
or “row” from a database query).

> The pattern typically indicates
> completion by some special value or exception once you
> iterate through the entire set and go past the end.

ES& standarized a specific Protocol for the iterator
The protocol defines a next() method whose return
is an object called an iterator result; the object has value and
done properties, where done is a boolean that is false until
the iteration over the underlying data source is complete.

# Consuming iterators

ES6 also included several mechanisms (syntax and APIs) for standardized
consumption of these iterators.

For example the foor..of loop:

```js
// given an iterator of some data source:
var it = /* .. */;
// loop over its results one at a time
for (let val of it) {
	console.log(`Iterator value: ${ val }`);
}
// Iterator value: ..
// Iter
```

Another mechanism that’s often used for consuming iterators
is the ... operator. This operator actually has two symmetri-
cal forms: spread and rest (or gather, as I prefer). The spread
form is an iterator-consumer.

```js
// spread an iterator into an array,
// with each iterated value occupying
// an array element position.
var vals = [...it];
```

```js
// spread an iterator into a function,
// call with each iterated value
// occupying an argument position.
doSomethingUseful(...it);
```

> the iterator-spread form of ... follows the
> iterator-consumption protocol

# Iterables

An iterable is a value that can be iterated over. This includes
strings arrays, maps, sets, generator functions and oters.

```js
// an array is an iterable
var arr = [10, 20, 30];
for (let val of arr) {
	console.log(`Array value: ${val}`);
}
// Array value: 10
// Array value: 20
// Array value: 30
```

Since arrays are iterables, we can shallow-copy an array using
iterator consumption via the ... spread operator:

```js
var arrCopy = [...arr];
```

We can also iterate the characters in a string one at a time:

```js
var greeting = 'Hello world!';
var chars = [...greeting];
chars;
// [ "H", "e", "l", "l", "o", " ",
// [ "w", "o", "r", "l", "d", "!" ]
```

A Map data structure uses objects as keys, associating a value
(of any type) with that object. Maps have a different default
iteration than seen here, in that the iteration is not just over
the map’s values but instead its entries. An entry is a tuple
(2-element array) including both a key and a value.

```js
// given two DOM elements, `btn1` and `btn2`
var buttonNames = new Map();
buttonNames.set(btn1, 'Button 1');
buttonNames.set(btn2, 'Button 2');
for (let [btn, btnName] of buttonNames) {
	btn.addEventListener('click', function onClick() {
		console.log(`Clicked ${btnName}`);
	});
}
```

In the for..of loop over the default map iteration, we use
the [btn,btnName] syntax (called “array destructuring”) to
break down each consumed tuple into the respective key/-
value pairs ( btn1 / "Button 1" and btn2 / "Button 2" ).
Each of the built-in iterables in JS expose a default iteration,
one which likely matches your intuition. But you can also
choose a more specific iteration if necessary.

if we want to consume only the values of the above but-
tonNames map, we can call values() to get a values-only
iterator:

```js
for (let btnName of buttonNames.values()) {
	console.log(btnName);
}
// Button 1
// Button 2
```

Or if we want the index and value in an array iteration, we
can make an entries iterator with the entries() method:

```js
var arr = [10, 20, 30];
for (let [idx, val] of arr.entries()) {
	console.log(`[${idx}]: ${val}`);
}
// [0]: 10
// [1]: 20
// [2]: 30
```

For the most part, all built-in iterables in JS have three iterator
forms available: keys-only `(keys())`, values-only `(values())`,
and entries `(entries())`.

Beyond just using built-in iterables, you can also ensure your
own data structures adhere to the iteration protocol

> > You may have noticed a nuanced shift that oc-
> > curred in this discussion. We started by talking
> > about consuming iterators, but then switched to
> > talking about iterating over iterables. The iter-
> > ation-consumption protocol expects an iterable,
> > but the reason we can provide a direct iterator is
> > that an iterator is just an iterable of itself! When
> > creating an iterator instance from an existing
> > iterator, the iterator itself is returned.

# Closure

Closure is when a function remembers and contin-
ues to access variables from outside its scope, even
when the function is executed in a different scope.

To observe a closure, you must execute
a function in a different scope than where that function was
originally defined.

```js
function greeting(msg) {
	return function who(name) {
		console.log(`${msg}, ${name}!`);
	};
}
var hello = greeting('Hello');
var howdy = greeting('Howdy');
hello('Kyle');
// Hello, Kyle!
hello('Sarah');
// Hello, Sarah!
howdy('Grant');
// Howdy, Grant!
```

First, the greeting(..) outer function is executed, creating
an instance of the inner function who(..)

When the greeting(..) function finishes running, normally
we would expect all of its variables to be garbage collected
(removed from memory). We’d expect each msg to go away,
but they don’t. The reason is closure. Since the inner function
instances are still alive (assigned to hello and howdy , respec-
tively), their closures are still preserving the msg variables.

These closures are not a snapshot of the msg variable’s value;
they are a direct link and preservation of the variable itself.
That means closure can actually observe (or make!) updates
to these variables over time.

```js
function counter(step = 1) {
	var count = 0;
	return function increaseCount() {
		count = count + step;
		return count;
	};
}
var incBy1 = counter(1);
var incBy3 = counter(3);
incBy1();
incBy1(); // 1
// 2
incBy3();
incBy3();
incBy3(); // 3
// 6
// 9
```

Each instance of the inner increaseCount() function is
closed over both the count and step variables from its outer
counter(..) function’s scope. step remains the same over
time, but count is updated on each invocation of that inner
function. Since closure is over the variables and not just
snapshots of the values, these updates are preserved.

> Closure is most common when working with asynchronous
> code, such as with callbacks. Consider:

```js
function getSomeData(url) {
	ajax(url, function onResponse(resp) {
		console.log(`Response (from ${url}): ${resp}`);
	});
}
getSomeData('https://some.url/wherever');
// Response (from https://some.url/wherever): ...
```

It’s not necessary that the outer scope be a function—it usually
is, but not always—just that there be at least one variable in
an outer scope accessed from an inner function:

```js
for (let [idx, btn] of buttons.entries()) {
	btn.addEventListener('click', function onClick() {
		console.log(`Clicked on button (${idx})!`);
	});
}
```

Because this loop is using let declarations, each iteration gets
new block-scoped (aka, local) idx and btn variables; the loop
also creates a new inner onClick(..) function each time.
That inner function closes over idx , preserving it for as long
as the click handler is set on the btn . So when each button
is clicked, its handler can print its associated index value,
because the handler remembers its respective idx variable.

# This Keyword

One common mis-conception is that a function’s this refers to the function
itself. another misconception is that this points the instance that a method
belongs to. Both are incorrect

When a function is defined, it isattached to its enclosing scope via closure.
Scope is the set of rules that controls how references to variables are resolved.

But functions also have another characteristic This characteristic
is best described as an execution context, and it’s exposed to
the function via its this keyword.

Scope is static and contains a fixed set of variables available
but a function’s execution context is dynamic, entirely dependent
pm hpw ot is called.

this is not a fixed characteristic of a function based on
the function’s definition, but rather a dynamic characteristic
that’s determined each time the function is called.

One way to think about the execution context is that it’s
a tangible object whose properties are made available to a
function while it executes. Compare that to scope, which
can also be thought of as an object; except, the scope object
is hidden inside the JS engine, it’s always the same for
that function, and its properties take the form of identifier
variables available inside the function.

```js
function classroom(teacher) {
	return function study() {
		console.log(`${teacher} says to study ${this.topic}`);
	};
}
var assignment = classroom('Kyle');
```

the inner study() function does reference this ,
which makes it a this -aware function. it’s a
function that is dependent on its execution context.

The inner study() function returned by classroom("Kyle")
is assigned to a variable called assignment . So how can
assignment() (aka study() ) be called?

```js
assignment();
// Kyle says to study undefined
-- Oops :(
```

In this snippet, we call assignment() as a plain, normal
function, without providing it any execution context.

Since this program is not in strict mode, context-aware functions that are called
without any context specified default the context to the
global object As there is no global
variable named topic

```js
var homework = {
	topic: 'JS',
	assignment: assignment,
};
homework.assignment();
// Kyle says to study JS
```

A copy of the assignment function reference is set as a
property on the homework object, and then it’s called as
homework.assignment() . That means the this for that
function call will be the homework object. Hence, this.topic
resolves to "JS" .

```js
var otherHomework = {
	topic: 'Math',
};
assignment.call(otherHomework);
// Kyle says to study Math
```

The benefit of this -aware functions—and their dynamic
context—is the ability to more flexibly re-use a single function
with data from different objects.

# Prototypes

Where this is a characteristic of function execution, a proto-
type is a characteristic of an object, and specifically resolution
of a property access.

A series of objects linked together via prototypes is called the
“prototype chain.”

The purpose of this prototype linkage is so that accesses against B for
properties/methods that B does not have, are delegated to A
to handle.

```js
var homework = {
	topic: 'JS',
};
```

its default prototype linkage connects to the Object.prototype object.

We can observe this prototype linkage delegation from home-
work to Object.prototype:

```js
homework.toString();
```

homework.toString() works even though homework doesn’t
have a toString() method defined; the delegation invokes
Object.prototype.toString() instead.

Object Linkage

To define an object prototype linkage, you can create the
object using the Object.create(..) utility:

```js
var homework = {
	topic: 'JS',
};
var otherHomework = Object.create(homework);
otherHomework.topic;
// "JS"
```

Delegation through the prototype chain only applies for ac-
cesses to lookup the value in a property. If you assign to a
property of an object, that will apply directly to the object
regardless of where that object is prototype linked to.

> > Object.create(null) creates an object that is
> > not prototype linked anywhere, so it’s purely just
> > a standalone object; in some circumstances, that
> > may be preferable.

```js
homework.topic;
// "JS"
otherHomework.topic;
// "JS"
otherHomework.topic = 'Math';
otherHomework.topic;
// "Math"
homework.topic;
// "JS" -- not "Math"
```

# This in prototypes

one of the main reasons this supports
dynamic context based on how the function is called is so that
method calls on objects which delegate through the prototype
chain still maintain the expected this.

```js
var homework = {
	study() {
		console.log(`Please study ${this.topic}`);
	},
};
var jsHomework = Object.create(homework);
jsHomework.topic = 'JS';
jsHomework.study();
// Please study JS
var mathHomework = Object.create(homework);
mathHomework.topic = 'Math';
mathHomework.study();
// Please study Math
```

This works somehow as an inheritance

jsHomework.`study()` delegates to `homework.study()` , but
its this `(this.topic)` for that execution resolves to jsHome-
work because of how the function is called

The preceding code snippet would be far less useful if this
was resolved to homework . Yet, in many other languages, it
would seem this would be homework because the `study()`
method is indeed defined on homework .

## Chapter 4: The Bigger Picture

# Pillar 1: Scope and Closure

Scopes nest inside each other, and for any given expression
higher/outer scopes, are accessible; variables from lower/in-ner
scopes are hidden and inaccessible.

The scope unit boundaries, are determined at the time the program
is parsed

> hoisting: when all variables
> declared anywhere in a scope are treated as if they’re declared
> at the beginning of the scope. The other is that var -declared
> variables are function scoped, even if they appear inside a
> block.

let / const dec-
larations have a peculiar error behavior called the “Temporal
Dead Zone” (TDZ) which results in observable but unusable
variables.

Closure is a natural result of lexical scope

When a functionmakes reference to variables from an outer scope, and that
function is passed around as a value and executed in other
scopes, it maintains access to its original scope variables; this
is closure.

# Pillar 2: Prototypes

JS is one of very few languages where you have the option
to create objects directly and explicitly

Classes are just one pattern you can build on top of such
power. But another approach, in a very different direction, is
to simply embrace objects as objects, forget classes altogether,
and let objects cooperate through the prototype chain. This is
called behavior delegation. I think delegation is more power-
ful than class inheritance, as a means for organizing behavior
and data in our programs.

## Appendix A: Exploring Furter

# Values vs References

If you assign/pass a value itself, the value is copied. For
example:

```js
var myName = 'Kyle';
var yourName = myName;
```

- primitive values are
  always assigned/passed as value copies.

```js
var myName = 'Kyle';
var yourName = myName;
myName = 'Frank';
console.log(myName);
// Frank
console.log(yourName);
// Kyle
```

- references are the idea that two or more variables
  are pointing at the same value

```js
var myAddress = {
	street: '123 JS Blvd',
	city: 'Austin',
	state: 'TX',
};
var yourAddress = myAddress;
// I've got to move to a new house!
myAddress.street = '456 TS Ave';
console.log(yourAddress.street);
// 456 TS Ave
```

# Functions forms

```js
var awesomeFunction = function (coolThings) {
	// ..
	return amazingStuff;
};
```

The function expression here is referred to as an anonymous
function expression, since it has no name identifier between
the function keyword and the (..) parameter list.

```js
awesomeFunction.name;
// "awesomeFunction"
```

The name property of a function will reveal either its directly
given name (in the case of a declaration) or its inferred
name in the case of an anonymous function expression. That
value is generally used by developer tools when inspecting a
function value or when reporting an error stack trace.

So even an anonymous function expression might get a name.
However, name inference only happens in limited cases such
as when the function expression is assigned (with = ). If you
pass a function expression as an argument to a function call,
for example, no name inference occurs; the name property will
be an empty string, and the developer console will usually
report “(anonymous function)”.

```js
// let awesomeFunction = ..
// const awesomeFunction = ..
var awesomeFunction = function someName(coolThings) {
	// ..
	return amazingStuff;
};
awesomeFunction.name;
// "someName"
```

This function expression is a named function expression,
since the identifier someName is directly associated with the
function expression at compile time; the association with
the identifier awesomeFunction still doesn’t happen until
runtime at the time of that statement. Those two identifiers
don’t have to match; sometimes it makes sense to have them
be different, other times it’s better to have them be the same.

> In my opinion, if a function exists in your program, it has a
> purpose; otherwise, take it out! And if it has a purpose, it has
> a natural name that describes that purpose.

Here are more declaration forms:

```js
// generator function declaration
function *two() { .. }
// async function declaration
async function three() { .. }
// async generator function declaration
async function *four() { .. }
// named function export declaration (ES6 modules)
export function five() { .. }

// IIFE
(function(){ .. })();
(function namedIIFE(){ .. })();
// asynchronous IIFE
(async function(){ .. })();
(async function namedAIIFE(){ .. })();
// arrow function expressions
var f;
f = () => 42;
f = x => x * 2;
f = (x) => x * 2;
f = (x,y) => x * y;
f = x => ({ x: x * 2 });
f = x => { return x * 2; };
f = async x => {
var y = await doSomethingAsync(x);
return y * 2;
};
someOperation( x => x * 2 );
// ..
```

Keep in mind that arrow function expressions are syntac-
tically anonymous, meaning the syntax doesn’t provide a
way to provide a direct name identifier for the function

Functions can also be specified in class definitions and object
literal definitions

```js
class SomethingKindaGreat {
// class methods
coolMethod() { .. }
// no commas!
boringMethod() { .. }
}
var EntirelyDifferent = {
// object methods
coolMethod() { .. },
// commas!
boringMethod() { .. },
// (anonymous) function expression property
oldSchool: function() { .. }
};
```

# Coercive Conditional Comparison

if and ? : -ternary statements, as well as the test clauses in
while and for loops, all perform an implicit value compari-
son. But what sort? Is it “strict” or “coercive”? Both, actually.

```js
var x = 1;
if (x) {
	// will run!
}
while (x) {
	// will run, once!
	x = false;
}
```

You might think of these (x) conditional expressions like this:

```js
var x = 1;
if (x == true) {
	// will run!
}
while (x == true) {
	// will run, once!
	x = false;
}
```

In this specific case – the value of x being 1 – that mental
model works, but it’s not accurate more broadly. Consider:

```js
var x = 'hello';
if (x) {
	// will run!
}
if (x == true) {
	// won't run :(
}
```

Oops. So what is the if statement actually doing? This is the
more accurate mental model:

```js
var x = 'hello';
if (Boolean(x) == true) {
	// will run
}
// which is the same as:
if (Boolean(x) === true) {
	// will run
}
```
