class IGoblin {
	constructor(game, baseAttack = 1, baseDefense = 1) {
		this.game = game;
		this.attack = baseAttack;
		this.defense = baseDefense;
		this.game.goblins.map(_ => this.defense++);
		this.game.kings.map(_ => (this.attack += 3));
		this.game.goblins.push(this);
	}
}

class IGoblinKing extends IGoblin {
	constructor(game, baseAttack = 3, baseDefense = 3) {
		super(game);
		this.attack = baseAttack;
		this.defense = baseDefense;
		this.game.goblins.forEach(_ => this.defense++);
		this.game.kings.forEach(_ => (this.attack += 3));
		this.game.kings.push(this);
	}
}

class IGame {
	constructor() {
		this.kings = [];
		this.goblins = [];
	}
}

const igame = new IGame();
const Igoblin = new IGoblin(igame);
const king = new IGoblinKing(igame);
const goblin2 = new IGoblin(igame);
const goblin3 = new IGoblin(igame);
console.log(goblin2.attack);
console.log(goblin2.defense);

// Correct response

class Goblin {
	constructor(game, baseAttack = 1, baseDefense = 1) {
		this.attack = baseAttack;
		this.defense = baseDefense;
		this.game = game;
		this.increaseDefense(this.game.goblins);
		this.increaseDefense(this.game.kingGoblins);
		this.game.goblins.push(this);
	}

	increaseDefense(goblins) {
		goblins.forEach(goblin => {
			goblin.defense++;
		});
	}

	toString() {
		return `Goblin ${this.attack} / ${this.defense}`;
	}
}

class GoblinKing extends Goblin {
	constructor(game) {
		super(game, 3, 3);
		this.game = game;
		this.increaseAttack(this.game.goblins);
		this.game.kingGoblins.push(this);
	}

	increaseAttack(goblins) {
		goblins.forEach(goblin => {
			goblin.attack++;
		});
	}

	toString() {
		return `King Goblin ${this.attack} / ${this.defense}`;
	}
}

class Game {
	constructor() {
		this.goblins = [];
		this.kingGoblins = [];
	}
}
