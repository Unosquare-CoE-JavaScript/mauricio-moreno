import {curry} from 'ramda'

// Simple functions =============================
const add =  (x, y) => x  + y

const toUpper = string => string.toUpperCase();

const exlaim = string => string + '!'

const first = iterable => iterable[0]

// =============================================
// This is a compose function, a compose function allows you to create functions using a function
// and with that you can reuse your code easily, or modify executions of another functions passing
// static parameters
const compose = (def, fn) => x => def(fn(x))

// For example this function will take the first letter/element of an iterable and return it as capitalized

const firstUpper = compose(toUpper, first)

console.log("testing") // => "T"
