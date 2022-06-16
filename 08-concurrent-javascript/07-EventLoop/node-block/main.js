/* This application freezes every two seconds you can try with the rest client
 and the response will be sended every two seconds */
const http = require('http');

const view = new Int32Array(new SharedArrayBuffer(4));
// This operation blocks the event loop
setInterval(() => Atomics.wait(view, 0, 0, 1900), 2000);

const server = http.createServer((req, res) => res.end('Hello world!'));

server.listen(1337, (err, addr) => {
	if (err) throw err;
	console.log('http://localhost:1337/');
});

//! Don't use Atomics.wait in the main thread
/*Designate which threads are cpu-heavy and use lots of atomics calls
and which threads are vented */
/*Consider using simple bridge threds to wait and post messages where appropiate */
