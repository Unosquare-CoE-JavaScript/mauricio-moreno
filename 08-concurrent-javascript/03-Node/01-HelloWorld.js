const http = require('http');
const cluster = require('cluster');

/*The call to the listen will actually cause to listen the primary process
rather than the worker, then once a connection is received in the primary process
its handed off to a worker via IPC  */

// Change the code paths depending on wheter we're in the primary process
if (cluster.isPrimary) {
	// In the primary process we create four worker proceses
	cluster.fork();
	cluster.fork();
	cluster.fork();
	cluster.fork();
} else
	http
		.createServer((request, response) => {
			response.end('Hello World');
		})
		.listen(3000);

/*On this example the app listens one port and send the responses to another
to another workers */
