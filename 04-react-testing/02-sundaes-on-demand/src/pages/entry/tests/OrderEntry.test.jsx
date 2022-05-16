import {
	render,
	screen,
	waitFor,
} from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';

import { rest } from 'msw';
import { server } from '../../../mocks/server';
import { OrderDetailsProvider } from '../../../context/OrderDetails';
import userEvent from '@testing-library/user-event';

test('handles error for scoops and toppings routes', async function () {
	server.resetHandlers(
		rest.get('http://localhost:3030/scoops', (request, response, context) =>
			response(context.status(500)),
		),
		rest.get('http://localhost:3030/toppings', (request, response, context) => {
			response(context.status(500));
		}),
	);

	// We can use a jest prop mock
	render(<OrderEntry setOrderPhase={jest.fn()} />);

	await waitFor(async function waitingErrorMessages() {
		const alerts = await screen.findAllByRole('alert');
		expect(alerts).toHaveLength(2);
	});
});

test('disalbe order button if there are no scoops ordered', async function () {
	render(<OrderEntry />);

	let orderButton = screen.getByRole('button', { name: /order sundae/i });
	expect(orderButton).toBeDisabled();

	// expect button to be enabled after adding scoop
	const vanillaInput = await screen.findByRole('spinbutton', {
		name: /vanilla/i,
	});
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, '1');
	expect(orderButton).toBeEnabled();

	// expect button to be disabled again after removing scoop
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, '0');
	expect(orderButton).toBeDisabled();
});
