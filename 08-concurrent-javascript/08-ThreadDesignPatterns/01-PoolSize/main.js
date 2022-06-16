const http = require('http');
const RpcWorkerPool = require('./rpc-worker.js');
const worker = new RpcWorkerPool(
	'./worker.js',
	Number(process.env.THREADS) || 4,
	process.env.STRATEGY || 'random',
);

const server = http.createServer(async function (req, res) {
	// We send a kind of factorial maded of squared sums
	const value = Math.floor(Math.random() * 10_000_000);
	const sum = await worker.exec('square_sum', value); // Here we execute the rcp with the value
	res.end(JSON.stringify({ sum, value }));
});

server.listen(1337, error => {
	if (error) throw error;
	else console.log('http://localhost:1337/');
});
