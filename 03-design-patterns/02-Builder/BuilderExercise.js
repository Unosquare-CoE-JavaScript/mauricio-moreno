class Fields {
	constructor() {
		this.fields = [];
	}

	addField(field) {
		this.fields.push(field);
	}

	buildConstructorParams() {
		return this.fields.join(', ');
	}

	buildConstructorBody() {
		return this.fields
			.map(element => `		this.${element} = ${element};`)
			.join('\n');
	}

	get isEmpty() {
		return this.fields.length === 0;
	}
}

class CodeBuilder {
	constructor(className, fields = new Fields()) {
		this.className = className;
		this.fields = fields;
	}

	addField(name) {
		this.fields.addField(name);
		return this;
	}

	toString() {
		if (this.fields.isEmpty) {
			return `
class ${this.className} {
}`;
		} else {
			return `
class ${this.className} {
	constructor(${this.fields.buildConstructorParams()}) {
${this.fields.buildConstructorBody()}
	}
}`;
		}
	}
}

let codeBuilder = new CodeBuilder('Person');
codeBuilder.addField('name').addField('age');

console.log(codeBuilder.toString());

console.log('This is the second test =================');

let codeBuilder2 = new CodeBuilder('Foo');
console.log(codeBuilder2.toString());
