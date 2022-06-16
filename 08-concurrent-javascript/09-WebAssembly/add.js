const fs = require('fs/promises');

(async function main() {
	const wasm = await fs.readFile('./add.wasm');
	const {
		instance: {
			exports: { add },
		},
	} = await WebAssembly.instantiate(wasm);
	console.log(add(2, 3));
})();
