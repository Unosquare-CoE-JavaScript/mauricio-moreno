/* Write a function called isSingleton() */
/*This method takes a factory, and determines if that object is a singleton instance
or not */

class SingletonTester {
	static isSingleton(Generator) {
		let object1 = new Generator();
		let object2 = new Generator();

		return object1 === object2;
	}
}
