import {curry} from 'ramda'

const add =  (x, y) => x  + y

const toUpper = string => string.toUpperCase();

const exlaim = string => string + '!'

const first = iterable => iterable[0]

const compose = (def, fn) => x => def(fn(x))
