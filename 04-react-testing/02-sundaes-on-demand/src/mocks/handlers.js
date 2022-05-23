import { response, rest } from 'msw';

export const handlers = [
	rest.get('http://localhost:3030/scoops', (request, resolve, context) => {
		return resolve(
			context.json([
				{ name: 'Chocolate', imagePath: '/images/chocolate.png' },
				{ name: 'Vanilla', imagePath: '/images/vanilla.png' },
			]),
		);
	}),

	rest.get('http://localhost:3030/toppings', (request, resolve, context) => {
		return resolve(
			context.json([
				{ name: 'Cherries', imagePath: '/images/cherries.png' },
				{ name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
				{ name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
			]),
		);
	}),

	rest.post('http://localhost:3030/order', (request, resolve, context) => {
		return response(context.json({ orderNumber: 123455676 }));
	}),
];
