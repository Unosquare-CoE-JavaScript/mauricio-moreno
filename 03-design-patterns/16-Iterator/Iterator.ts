/**
 * Iterator Design Pattern
 *
 * Intent: Lets you traverse elements of a collection without exposing its
 * underlying representation (list, stack, tree, etc.).
 */
// Interfaces =================================================================
//prettier-ignore
interface Iterator<T> {
	current(): T;
	next(): T;       // Return the current element and move forward to the next element
	key(): number;   // Return the key of the current element.
	valid(): boolean;//Check if current position is valid.
	rewind(): void;  // Rewind the iterator to the First element
}

interface Aggregator {
	getIterator(): Iterator<string>; // Retrieve an external iterator.
}

/**
 * Concrete Iterators implement various traversal algorithms. These classes
 * store the current traversal position at all times.
 */
// This is the iterator ========================================================
class AlphabeticalOrderIterator implements Iterator<string> {
	private collection: WordsCollection;
	/*
	Stores the current traversal position. An iterator may have a lot of
	other fields for storing iteration state, especially when it is supposed
	to work with a particular kind of collection.
	 */
	private position: number;
	private reverse: boolean = false;

	constructor(collection: WordsCollection, reverse: boolean = false) {
		this.collection = collection;
		this.reverse = reverse;
		if (reverse) this.position = collection.getCount() - 1;
	}

	public rewind() {
		this.position = this.reverse ? this.collection.getCount() - 1 : 0;
	}

	public current(): string {
		return this.collection.getItems()[this.position];
	}

	public key(): number {
		return this.position;
	}

	public next(): string {
		const item = this.collection.getItems()[this.position];
		this.position += this.reverse ? -1 : 1;
		return item;
	}

	public valid(): boolean {
		if (this.reverse) return this.position >= 0;
		else return this.position < this.collection.getCount();
	}
}

/**
 * Concrete Collections provide one or several methods for retrieving fresh
 * iterator instances, compatible with the collection class.
 */
// This is the iterable collection =============================================
class WordsCollection implements Aggregator {
	private items: Array<string> = [];

	public getItems(): Array<string> {
		return this.items;
	}

	public getCount(): number {
		return this.items.length;
	}

	public addItems(item: string): void {
		this.items.push(item);
	}

	public getIterator(): Iterator<string> {
		return new AlphabeticalOrderIterator(this);
	}

	public getReverseIterator(): Iterator<string> {
		return new AlphabeticalOrderIterator(this, true);
	}
}

/**
 * The client code may or may not know about the Concrete Iterator or Collection
 * classes, depending on the level of indirection you want to keep in your
 * program.
 */
// ClientCode ===================================================
const collection = new WordsCollection();
collection.addItems('First');
collection.addItems('Second');
collection.addItems('Third');

console.log('Straight traversal:');
const iterator = collection.getIterator();
while (iterator.valid()) console.log(iterator.next());

console.log('');

console.log('Reverse traversal');
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) console.log(reverseIterator.next());
