import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { OrderDetailsProvider } from '../../../context/OrderDetails';
import { server } from '../../../mocks/server';
import OrderConfirmation from '../Confirmation';

test('Error response from server for submitting order', async function () {
	server.resetHandlers(
		rest.post('http://localhost:3030/order', (request, response, context) =>
			response(context.status(500)),
		),
	);

	render(<OrderConfirmation setOrderPhase={jest.fn()} />, {
		wrapper: OrderDetailsProvider,
	});

	const alert = await screen.findByRole('alert');
	expect(alert).toHaveTextContent(
		'An unexpected error ocurred. Please try it later',
	);
});
