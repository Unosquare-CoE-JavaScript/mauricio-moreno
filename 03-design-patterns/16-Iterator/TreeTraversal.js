//! Repasar
// Every node of the tree and its branches represented in left right nodes
class Node {
	constructor(value, left = null, right = null) {
		this.value = value;
		this.left = left;
		this.right = right;
		this.parent = null;

		if (this.left) left.parent = this;
		if (this.right) right.parent = this;
	}
}

//! This will be used in a binary tree
function makeInOrderIterator(root) {
	// go to leftmost
	let current = root;
	while (current.left) current = current.left; // Goes to the last node

	let yieldedStart = false;
	// We can set next values using if statements and returning objects
	return {
		next: function () {
			if (!yieldedStart) {
				yieldedStart = true;
				return {
					value: current,
					done: false,
				};
			}
			if (current.right) {
				current = current.right;
				while (current.left) {
					current = current.left;
				}
				return {
					value: current,
					done: false,
				};
			} else {
				let p = current.parent;
				while (p && current === p.right) {
					current = p;
					p = p.parent;
				}
				current = p;
				return {
					value: current,
					done: current == null,
				};
			}
		}, // next

		// this makes the iterator iterable
		[Symbol.iterator]: function () {
			return this;
		},
	};
}

class BinaryTree {
	constructor(rootNode) {
		this.rootNode = rootNode;
	}

	// assuming only one form of iteration
	[Symbol.iterator]() {
		return makeInOrderIterator(this.rootNode);
	}

	/* But also we can create generator functions that acts like an iterator because
	inside its api has the same methods, next and onde, and we can traverse recursively
	every node of the tree */
	*betterInOrder() {
		function* traverse(current) {
			if (current.left) {
				for (let left of traverse(current.left)) yield left;
			}
			yield current;
			if (current.right) {
				for (let right of traverse(current.right)) yield right;
			}
		}
		for (let node of traverse(this.rootNode)) yield node;
	}

	get inOrder() {
		return makeInOrderIterator(this.rootNode);
	}
}

//   1
//  / \
// 2   3

// in-order:  213
// preorder:  123
// postorder: 231

let root = new Node(1, new Node(2), new Node(3));

// c++ style
let it = makeInOrderIterator(root);
let result = it.next();
while (!result.done) {
	console.log(result.value.value);
	result = it.next();
}

let tree = new BinaryTree(root);

for (let x of tree) console.log(x.value);

// We can map the complete tree
console.log([...tree].map(x => x.value));

console.log([...tree.inOrder].map(x => x.value));

// a generator is both an iterator and iterable
console.log('using a generator...');
console.log([...tree.betterInOrder()].map(x => x.value));

for (let x of tree.betterInOrder()) console.log(x.value);
