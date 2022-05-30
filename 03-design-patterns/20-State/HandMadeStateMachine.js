const readline = require('readline');

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// These will be the names of the options in the terminal
let State = Object.freeze({
	offHook: 'off hook',
	connecting: 'connecting',
	connected: 'connected',
	onHold: 'on hold',
	onHook: 'on hook',
});

// These triggres change the states
let Trigger = Object.freeze({
	callDialed: 'dial a number',
	hungUp: 'hang up',
	callConnected: 'call is connected',
	placedOnHold: 'placed on hold',
	takenOffHold: 'taken off hold',
	leftMessage: 'leave a message',
});

// These states will change for each option we choose
// in the flow of the app
let rules = {};
// The key uses an object value as a key
rules[State.offHook] = [
	{
		trigger: Trigger.callDialed,
		state: State.connecting,
	},
];
rules[State.connecting] = [
	{
		trigger: Trigger.hungUp,
		state: State.onHook,
	},
	{
		trigger: Trigger.callConnected,
		state: State.connected,
	},
];
rules[State.connected] = [
	{
		trigger: Trigger.leftMessage,
		state: State.onHook,
	},
	{
		trigger: Trigger.hungUp,
		state: State.onHook,
	},
	{
		trigger: Trigger.placedOnHold,
		state: State.onHold,
	},
];
rules[State.onHold] = [
	{
		trigger: Trigger.takenOffHold,
		state: State.connected,
	},
	{
		trigger: Trigger.hungUp,
		state: State.onHook,
	},
];

let state = State.offHook;
let exitState = State.onHook;

let getInput = () => {
	let prompt = [`The phone is currently ${state}`, "What's next:"];

	// Gets all the rules of a concrete state for example
	for (let i = 0; i < rules[state].length; ++i) {
		let t = rules[state][i].trigger;
		prompt.push(`${i}. ${t}`);
	}

	// force an extra line break
	prompt.push('');

	rl.question(prompt.join('\n'), answer => {
		let input = parseInt(answer);
		state = rules[state][input].state;

		if (state !== exitState) getInput();
		else {
			console.log('We are done using the phone.');
			rl.close();
		}
	});
};

getInput();
