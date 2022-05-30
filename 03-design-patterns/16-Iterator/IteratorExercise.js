const firstPromise = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(1), 5000);
	});
};

const secondPromise = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(2), 3000);
	});
};

async function* generator() {
	const firstPromiseResult = await firstPromise();
	yield firstPromiseResult;
	const secondPromiseResult = await secondPromise();
	yield secondPromiseResult;
}

var it = generator();
for await (let value of it) {
	document.write(value);
	document.write('<br>');
}
