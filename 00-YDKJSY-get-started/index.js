//! Third exercise i dont know what is this shit

const randMax = max => Math.trunc(1e9 * Math.random()) % max;

var reel = {
	symbols: ['X', 'Y', 'Z', 'W', '$', '*', '>', '@'],
	spin() {
		if (this.position == null) this.position = randMax(this.symbols.length - 1);
		this.position = (this.position + 100 + randMax(100)) % this.symbols.length;
	},
	display() {
		if (this.position == null) this.position = randMax(this.symbols.length - 1);
		return this.symbols[this.position];
	},
};

//This slot machine needs 3 separate reels
// hint object.create
var slotMachine = {
	reels: [Object.create(reel), Object.create(reel), Object.create(reel)], //preguntar array.fill
	spin() {
		this.reels.forEach(reel => {
			reel.spin();
		});
	},
	display() {
		var lines = [];

		for (let linePos = -1; linePos <= 1; linePos++) {
			let line = this.reels.map(reel => {
				let slot = Object.create(reel);
				slot.position =
					(slot.symbols.length + slot.position + linePos) % slot.symbols.length;
				return reel.display.call(slot);
			});

			lines.push(line.join(' | '));
		}

		return lines.join('\n');
	},
};

slotMachine.spin();
console.log(slotMachine.display());
