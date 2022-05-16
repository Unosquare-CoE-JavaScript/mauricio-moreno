const fs = require('fs');
const path = require('path');

//This would fetch the data from a file
class MyDatabase {
	constructor() {
		const instance = this.constructor.instance;
		if (instance) return instance;
		else this.constructor.instance = this;

		console.log(`Initializing database`);
		this.capitals = {};

		const lines = fs
			.readFileSync(path.join(__dirname, 'capitals.txt'))
			.toString()
			.split('\r\n');

		for (let i = 0; i < lines.length / 2; ++i) {
			this.capitals[lines[2 * i]] = parseInt(lines[2 * 1 + 1]);
		}
	}

	getPopulation(city) {
		return this.capitals[city];
	}
}

//  ^^^^^^^^ This is a low level module

//vvvv high level module
class SingletonRecordFinder {
	totalPopulation(cities) {
		return cities
			.map(city => new MyDatabase.getPopulation(city))
			.reduce((x, y) => x + y);
	}
}

// This would record the data catched from the database
class ConfigurableRecordFinder {
	constructor(database) {
		this.database = database;
	}
	totalPopulation(cities) {
		return cities
			.map(city => this.database.getPopulation(city))
			.reduce((x, y) => x + y);
	}
}

// This would be used in the testing escenarios
class DummyDatabase {
	constructor() {
		this.capitals = {
			alpha: 1,
			beta: 2,
			gamma: 3,
		};
	}

	getPopulation(city) {
		return this.capitals[city];
	}
}

describe('Singleton database', () => {
	//This would test if the database created will be a singleton
	it('is a singleton', () => {
		const db1 = new MyDatabase();
		const db2 = new MyDatabase();
		expect(db1).toBe(db2);
	});

	it('calculates total population', () => {
		const rf = new SingletonRecordFinder();
		const cities = ['Seoul', 'Mexico City'];
		const totalPopulation = rf.totalPopulation(cities); // Saves the data in a singleton
		/*Because we are using a production database this test can be truth
		some time but as the data changes it would throw an error because of that
		we need to do another thing */
		expect(totalPopulation).toEqual(17400000 + 17500000);
	});

	/* When you test something that has a database connection you need to use
	a test database, not the production database */
	it('Calculates total population in a better way', () => {
		let db = new DummyDatabase();
		let rf = new ConfigurableRecordFinder(db);
		expect(rf.totalPopulation(['alpha', 'beta'])).toEqual(3);
	});
});
