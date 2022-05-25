class MyDBConn {
	protected static instance: MyDBConn | null = null;
	private id: number = 0;

	constructor() {
		// Db connection logic
		this.id = Math.random(); // The id could represent the actual connection to the db
	}

	public getID(): number {
		return this.id;
	}

	// We should use this to get an instance of this class
	public static getInstance(): MyDBConn {
		if (!MyDBConn.instance) MyDBConn.instance = new MyDBConn();
		else return MyDBConn.instance;
	}
}

// Every other instance should refer to this instance
const firstInstance = MyDBConn.getInstance();

const connections = [
	MyDBConn.getInstance(),
	MyDBConn.getInstance(),
	MyDBConn.getInstance(),
	MyDBConn.getInstance(),
	MyDBConn.getInstance(),
];

//You'll see the same number in the console
connections.forEach(element => console.log(element.getID()));
