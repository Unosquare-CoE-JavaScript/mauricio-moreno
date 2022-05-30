// this tag will take the role of the product being constructed
// IT needs to haeve a method tat receives the data and alters
class Tag {
	static get indentSize() {
		return 2;
	}

	constructor(name = '', text = '') {
		this.name = name;
		this.text = text;
		this.children = [];
	}

	/* this method returns the data parsed in a legible way */
	// PRIVATE ######################3
	toStringImpl(indent) {
		let html = [];
		let i = ' '.repeat(indent * Tag.indentSize);
		html.push(`${i}<${this.name}>\n`);
		if (this.text.length > 0) {
			html.push(' '.repeat(Tag.indentSize * (indent + 1)));
			html.push(this.text);
			html.push('\n');
		}

		for (let child of this.children) html.push(child.toStringImpl(indent + 1));

		html.push(`${i}</${this.name}>\n`);
		return html.join();
	}

	// PUBLIC ===============
	toString() {
		return this.toStringImpl(0);
	}

	static create(name) {
		return new HtmlBuilder(name);
	}
}

// This class will take te role of a Builder
// IT will create tags and add content to it trough a serie of methods
//
class HtmlBuilder {
	constructor(rootName) {
		this.root = new Tag(rootName);
		this.rootName = rootName;
	}

	// non-fluent
	addChild(childName, childText) {
		let child = new Tag(childName, childText);
		this.root.children.push(child);
	}

	// fluent
	/* This will be the method that adds content to the child it builds it
	when its necessary with the data needed*/
	addChildFluent(childName, childText) {
		let child = new Tag(childName, childText);
		this.root.children.push(child);
		/* When you return this you can use the returned value as if it is a
		functor and make more mutations in a dotpipe */
		return this;
	}

	// Rshows the data
	toString() {
		return this.root.toString();
	}

	/* You need to have a reset method that allows you to restart the building
	Process of a product */
	clear() {
		this.root = new Tag(this.rootName);
	}

	// Return all the data
	build() {
		return this.root;
	}
}

/* In this implementation a director is not provided */

// This would be without the design pattern ===============================
// just a single paragraph using string concatenation
const hello = 'hello';
let html = [];
html.push('<p>');
html.push(hello);
html.push('</p>');
console.log(html.join());

// a list with 2 words in it
const words = ['hello', 'world'];
html = [];
html.push('<ul>\n');
for (let word of words) html.push(`  <li>${word}</li>\n`);
html.push('</ul>');
console.log(html.join());

//! This is the implementation ===================================================
console.log('Implementation ============================');
// ordinary non-fluent builder
let builder = new HtmlBuilder('ul');
for (let word of words) builder.addChild('li', word);

//console.log(builder.toString());
let tag = builder.build();
console.log(tag.toString());

// ------------------------------------------------------------------------------
// fluent builder
builder.clear();
builder
	.addChildFluent('li', 'foo')
	.addChildFluent('li', 'bar')
	.addChildFluent('li', 'baz');
console.log(builder.toString());
