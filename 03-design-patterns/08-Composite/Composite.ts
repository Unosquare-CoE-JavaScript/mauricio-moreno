/**
 * The base Component class declares common operations for both simple and
 * complex objects of a composition.
 */
// Interface =================================================================
abstract class Component {
	protected parent: Component;

	/**
	 * Optionally, the base Component can declare an interface for setting and
	 * accessing a parent of the component in a tree structure. It can also
	 * provide some default implementation for these methods.
	 */
	public setParent(parent: Component) {
		this.parent = parent;
	}

	public getParent(): Component {
		return this.parent;
	}

	/**
	 * In some cases, it would be beneficial to define the child-management
	 * operations right in the base Component class. This way, you won't need to
	 * expose any concrete component classes to the client code, even during the
	 * object tree assembly. The downside is that these methods will be empty
	 * for the leaf-level components.
	 */
	public add(component: Component): void {} // Optionals
	public remove(component: Component): void {}

	/**
	 * You can provide a method that lets the client code figure out whether a
	 * component can bear children.
	 */
	public isComposite(): boolean {
		return false;
	}

	/**
	 * The base Component may implement some default behavior or leave it to
	 * concrete classes (by declaring the method containing the behavior as
	 * "abstract").
	 */
	public abstract operation(): string;
}

/**
 * The Leaf class represents the end objects of a composition. A leaf can't have
 * any children.
 *
 * Usually, it's the Leaf objects that do the actual work, whereas Composite
 * objects only delegate to their sub-components.
 */
// Component ===================================================================
class Leaf extends Component {
	public operation(): string {
		return 'Leaf';
	}
}

/**
 * The Composite class represents the complex components that may have children.
 * Usually, the Composite objects delegate the actual work to their children and
 * then "sum-up" the result.
 */
// Composite ==================================================================
class Composite extends Component {
	protected children: Array<Component> = [];

	public add(component: Component): void {
		this.children.push(component);
		component.setParent(this); // this is the root of the componen
	}
	public remove(component: Component): void {
		const componentIndex = this.children.indexOf(component);
		this.children.splice(componentIndex, 1);

		component.setParent(null);
	}

	public isComposite(): boolean {
		return true;
	}

	/**
	 * The Composite executes its primary logic in a particular way. It
	 * traverses recursively through all its children, collecting and summing
	 * their results. Since the composite's children pass these calls to their
	 * children and so forth, the whole object tree is traversed as a result.
	 */
	public operation(): string {
		const results = [];
		for (const child of this.children) results.push(child.operation());

		return `Branch(${results.join('+')})`;
	}
}

export const clientCode = (component: Component): void =>
	console.log(`RESULT: ${component.operation()}`);

const simple = new Leaf();
console.group("Client: I've got a simple component:");
clientCode(simple);
console.log('');

const tree = new Composite();

const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());

const branch2 = new Composite();
branch2.add(new Leaf());
branch2.add(new Leaf());
branch2.add(new Leaf());

tree.add(branch1);
tree.add(branch2);
console.log("Client: Now I've got a composite tree:");

clientCode(tree);
console.log('');

function clientCode2(component1: Component, component2: Component) {
	if (component1.isComposite()) component1.add(component2);
	console.log(`RESULT: ${component1.operation()}`);
}

console.log(
	"Client: I don't need to check the components classes even when managing the tree",
);
clientCode2(tree, simple);
