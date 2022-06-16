navigator.serviceWorker.register('/sw.js', {
	scope: '/', // Affects all pages on the path and subfolders
});

// Listes for a controllerchange event
navigator.serviceWorker.oncontrollerchange = () =>
	console.log('Controller change');


// Function to initiate request
export async function makeRequest() {
	const result = await fetch('/data.json');
	const payload = await result.json();
	console.log(payload);
}
