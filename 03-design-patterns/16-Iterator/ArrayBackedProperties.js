/* In this class we can manage the stats of a pokemon and store each characteristic
in a predefined position of an array and with that we can create simple methods that
traverse every property in the array of properties */
class Creature {
	constructor() {
		this.stats = new Array(3).fill(10);
	}

	get strength() {
		return this.stats[0];
	}

	set strength(value) {
		this.stats[0] = value;
	}

	get agility() {
		return this.stats[1];
	}

	set agility(value) {
		this.stats[1] = value;
	}

	get intelligence() {
		return this.stats[2];
	}

	set intelligence(value) {
		this.stats[2] = value;
	}

	// Here are the methods that traverse every property
	get sumOfStats() {
		return this.stats.reduce((x, y) => x + y, 0);
	}

	get averageStat() {
		return this.sumOfStats / this.stats.length;
	}

	get maxStat() {
		return Math.max(...this.stats);
	}
}

let creature = new Creature();
// We set the properties of the pokemon
creature.strength = 10;
creature.agility = 11;
creature.intelligence = 15;

console.log(
	`Creature has average stat ${creature.averageStat}\n` +
		`max stat = ${creature.maxStat}\n` +
		`sum of stats = ${creature.sumOfStats}\n`,
);
