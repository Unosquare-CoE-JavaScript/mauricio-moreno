//only we can use shared buffer when corssOriginIsolated
if (!crossOriginIsolated) throw new Error('Cannot use SharedArrayBuffer');

const worker = new Worker('worker.js');

const buffer = new SharedArrayBuffer(1024); // 1 kb buffer
const view = new Uint8Array(buffer); /* a view into the buffer is created
That allows us to read and write on the buffer */

console.log('now', view[0]);

worker.postMessage(buffer);

setTimeout(() => {
	console.log('later', view[0]);
	// This can not be shared
	console.log('prop', buffer.foo); //A modified property is readed
}, 500);

/* This will print
|> now 0
|> updated in worker
|> later 2
|> prop undefined
*/
