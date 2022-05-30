/* A class that needs to be copied must implement a public function called clone */
interface IPrototype {
	clone(): this;
}

/**
 * The example class that has cloning ability. We'll see how the values of field
 * with different types will be cloned.
 */
class Prototype implements IPrototype {
	public primitive: any;
	public component: object;
	public circularReference: ComponentWithBackReference;

	public clone(): this {
		const clone = Object.create(this);
		clone.component = Object.create(this.component);

		/*  Cloning an object that has a nested object with backreference
		requires special treatment. After the cloning is completed, the
		nested object should point to the cloned object, instead of the
		original object. Spread operator can be handy for this case. */
		clone.circularReference = {
			...this.circularReference,
			prototype: { ...this },
		};
		return clone;
	}
}

class ComponentWithBackReference {
	public prototype;
	constructor(prototype: Prototype) {
		this.prototype = prototype;
	}
}

// Client code ============================================

const clientCode_4 = () => {
	const p1 = new Prototype(); // -> {}
	p1.primitive = 245; // -> {primitive: 245}
	p1.component = new Date(); // -> {primitive: 245, component: 2022-05...}
	p1.circularReference = new ComponentWithBackReference(p1);
	// -> {... circularReference: ComponentWithBackReference {prototype: [circular *1]}}

	const p2 = p1.clone();

	if (p1.primitive === p2.primitive)
		console.log('PRmitive field values have been carred over to a clone. Yay!');
	else console.log('>Primitive field values have not been copied. Booo!');

	if (p1.component === p2.component)
		console.log('>Simple component has not been cloned. Booo!');
	else console.log('Simple component has been cloned. Yay!');

	if (p1.circularReference === p2.circularReference)
		console.log('>Component with back reference has not been cloned. Boo!');
	else console.log('Component with back reference has been cloned. Yay!');

	if (p1.circularReference.prototype === p2.circularReference.prototype)
		console.log(
			'>Component with back reference is linked to original object. Boo!',
		);
	else
		console.log('Component with back reference is linked to the clone. Yay!');
};

clientCode_4();
