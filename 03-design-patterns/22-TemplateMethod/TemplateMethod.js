/*abstract*/ class Game {
	constructor(numberOfPlayers) {
		// This also specified the general attributes of the game
		this.numberOfPlayers = numberOfPlayers;
		this.currentPlayer = 0;
	}

	/* This is the template method is a predefined functionality that
	doesnt specifies concretly its low level methods only the general
	purlose */
	run() {
		this.start();
		while (!this.haveWinner) this.takeTurn();

		console.log(`Player ${this.winningPlayer} wins.`);
	}

	start() {}
	get haveWinner() {}
	takeTurn() {}
	get winningPlayer() {}
}

/* This is the implementation of the abstract template and extends
the rules defined before*/
class Chess extends Game {
	constructor() {
		super(2);
		this.maxTurns = 10;
		this.turn = 1;
	}

	start() {
		console.log(
			`Starting a game of chess with ${this.numberOfPlayers} players.`,
		);
	}

	get haveWinner() {
		return this.turn === this.maxTurns;
	}

	takeTurn() {
		console.log(`Turn ${this.turn++} taken by player ${this.currentPlayer}.`);
		this.currentPlayer = (this.currentPlayer + 1) % this.numberOfPlayers;
	}

	get winningPlayer() {
		return this.currentPlayer;
	}
}

let chess = new Chess();
chess.run();
