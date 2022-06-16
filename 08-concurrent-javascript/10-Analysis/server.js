const Fastify = require('fastify');
const RpcWorkerPool = require('../08-ThreadDesignPatterns/01-PoolSize/rpc-worker');
const worker = new RpcWorkerPool('./worker.js', 4, 'leastbusy')
const template = require('./template.js');
const server = Fastify();

server.get('/main', async (request, response) => template.renderLove({
	me: 'Thomes', you: 'Katelyn'
}))

server.listen(3000, (error, address) => {
	if(error) throw error;
	console.log(`Listening on: ${address}`)
})

const timer = process.hrtime.bigint;
setInterval(() => {
	const start = timer();
	setImmediate(() => {
		console.log(`delay: ${(timer() - start).toLocaleString()}ns`);
	})
},1000)
