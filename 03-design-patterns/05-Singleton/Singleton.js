/* In singleton the first time that the class is initialized
it will save the instance in the constructor and when the class is
re-initialized the class will return the previous instance */
class Singleton {
	/* When it is initialized you should check if there is an instance already
	created if not then initialice it */
	constructor() {
		const instance = this.constructor.instance;
		if (instance) return instance;
		else this.constructor.instance = this;
	}

	foo() {
		console.log('Doing something...');
	}
}

let s1 = new Singleton();
let s2 = new Singleton();

console.log(`Are they identical ${s1 === s2}`);
s1.foo();
