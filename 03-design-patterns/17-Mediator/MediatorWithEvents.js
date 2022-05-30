// This is an observer design pattern
class Event {
	constructor() {
		this.handlers = new Map();
		this.count = 0;
	}

	subscribe(handler) {
		this.handlers.set(++this.count, handler);
		return this.count;
	}

	unsubscribe(idx) {
		this.handlers.delete(idx);
	}

	fire(sender, args) {
		this.handlers.forEach(element => {
			element(sender, args);
		});
	}
}

// This will be sended to the observer
class PlayerScoredEventArgs {
	constructor(playerName, goalsScoredSoFar) {
		this.playerName = playerName;
		this.goalsScoredSoFar = goalsScoredSoFar;
	}

	print() {
		console.log(
			`${this.playerName} has scored ` + `their ${this.goalsScoredSoFar} goal.`,
		);
	}
}

// This will be sended to another classes
class Game {
	constructor() {
		this.events = new Event();
	}
}

class Player {
	constructor(name, game) {
		this.name = name;
		this.game = game;
		this.goalsScored = 0;
	}

	score() {
		this.goalsScored++;
		let args = new PlayerScoredEventArgs(this.name, this.goalsScored);
		this.game.events.fire(this, args);
	}
}

class Coach {
	constructor(game) {
		this.game = game;

		game.events.subscribe((_, args) => {
			if (args instanceof PlayerScoredEventArgs && args.goalsScoredSoFar < 3) {
				console.log(`coach says: well done, ${args.playerName}`);
			}
		});
	}
}

let game = new Game();
let player = new Player('Sam', game); // We add a player to a game
let coach = new Coach(game); // We add a coach to a game

player.score();
player.score();
player.score();
