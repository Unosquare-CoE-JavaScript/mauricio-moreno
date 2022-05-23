import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('Order phases for happy path', async function () {
	// render app
	render(<App />);

	// add ice cream scoops and toppings
	const vanillaInput = await screen.findByRole('spinbutton', {
		name: /vanilla/i,
	});
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, '1');

	const chocolateInput = screen.getByRole('spinbutton', { name: /chocolate/i });
	userEvent.clear(chocolateInput);
	userEvent.type(chocolateInput, '2');

	const cherriesCheckbox = await screen.findByRole('checkbox', {
		name: /cherries/i,
	});
	userEvent.click(cherriesCheckbox);

	// find and click order button
	const orderSumaryButton = screen.getByRole('button', {
		name: /order sundae/i,
	});
	userEvent.click(orderSumaryButton);

	// check summary inromation based on order
	const summaryHeading = screen.getByRole('heading', {
		name: /order summary/i,
	});
	expect(summaryHeading).toBeInTheDocument();

	const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
	expect(scoopsHeading).toBeInTheDocument();

	const toppingsHeading = screen.getByRole('heading', {
		name: 'Toppings: $1.50',
	});
	expect(toppingsHeading).toBeInTheDocument();

	// accept terms and conditions and click button to confirm order
	const termsAndConditionsCheckbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	userEvent.click(termsAndConditionsCheckbox);

	const confirmOrderButton = screen.getByRole('button', {
		name: /confirm order/i,
	});
	userEvent.click(confirmOrderButton);

	//confirm order number on confirmation page
	// This is async because it needs to send a petition to a server and verify if
	// The server has a response to the petition
	const thankYouHeader = await screen.findByRole('heading', {
		name: /thank you/i,
	});
	expect(thankYouHeader).toBeInTheDocument();

	const orderNumber = await screen.findByText(/order number/i);
	expect(orderNumber).toBeInTheDocument();

	//click new order button on confirmation page
	const newOrderButton = screen.getByRole('button', { name: /new order/i });
	userEvent.click(newOrderButton);

	// check that scoops and toppings subtotals have ben reset
	const scoopsTotal = screen.getByText('Scoops total: $0.00');
	expect(scoopsTotal).toBeInTheDocument();
	const toppingsTotal = screen.getByText('Toppings total: $0.00');
	expect(toppingsTotal).toBeInTheDocument();

	// do we ned to await anything to avoid test errors?
	await screen.findByRole('checkbox', { name: /cherries/i });
	await screen.findByRole('spinbutton', { name: /vanilla/i });
});

test('Toppings header is not on summary page if no toppings ordered', async function () {
	render(<App />);

	const vanillaInput = await screen.findByRole('spinbutton', {
		name: /vanilla/i,
	});
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, '1');

	const chocolateInput = screen.getByRole('spinbutton', { name: /chocolate/i });
	userEvent.clear(chocolateInput);
	userEvent.type(chocolateInput, '2');

	// find and click order summary button
	const orderSummaryButton = screen.getByRole('button', {
		name: /order sundae/i,
	});
	userEvent.click(orderSummaryButton);

	const scoopsheading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
	expect(scoopsheading).toBeInTheDocument();

	// When the element can or can not be in the document we use "queryByRole"
	const toppingsHeading = screen.queryByRole('heading', { name: /toppings/i });
	expect(toppingsHeading).not.toBeInTheDocument();
});
