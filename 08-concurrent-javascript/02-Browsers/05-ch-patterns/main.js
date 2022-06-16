const worker = new RcpWorker('worker.js');

// This wrapps all the promises and when every promise is completed return
// The values in an array that we destructure in the function received
Promise.allSettled([
	worker.exec('square_sum', 1_000_000),
	worker.exec('fibonacci', 1_000),
	worker.exec('fake_method'),
	worker.exec('bad'),
]).then(function logResults([square_sum, fibonacci, fake, bad]) {
	console.log('square_sum', square_sum);
	console.log('fibonacci', fibonacci);
	console.log('fake', fake);
	console.log('bad', bad);
});
