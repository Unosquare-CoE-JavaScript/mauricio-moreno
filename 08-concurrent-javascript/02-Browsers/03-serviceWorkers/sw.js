let counter = 0;

// This works almost like a middleware that is executed between each petition
self.oninstall = event => {
	console.log('service worker install');
};

self.onactivate = event => {
	console.log('service worker activate');
	// Allows to claim the html file
	event.waitUntil(self.clients.claim());
};

self.onfetch = event => {
	console.log('fetch', event.request.url);

	if (event.request.url.endsWith('/data.json')) {
		counter++;
		// Replaces the data when data.json is requested
		event.respondWith(
			new Response(JSON.stringify({ counter }), {
				headers: {
					'Content-Type': 'application/json',
				},
			}),
		);
		return;
	}
	// Other urls will fallback in a normal network request
	event.respondWith(fetch(event.request));
};
