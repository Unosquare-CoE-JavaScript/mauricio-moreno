## Chapter 2

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
