import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../context/OrderDetails';
import { render, screen } from '../../../test-utils/testing-library-utils';

import Options from '../Options';

test('Displays image for each scoop otion from server', async function () {
	render(<Options optionType="scoops" />);

	// find images
	const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
	expect(scoopImages).toHaveLength(2);

	// confirm alt text of images
	const altText = scoopImages.map(element => element.alt);
	expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

// Exercise
test('Displays image for each topping option from server', async function () {
	render(<Options optionType="toppings" />);

	const toppingsImages = await screen.findAllByRole('img', {
		name: /topping$/i,
	});

	//confirm alt text of images exists
	const altText = toppingsImages.map(element => element.alt);
	expect(altText).toEqual([
		'Cherries topping',
		'M&Ms topping',
		'Hot fudge topping',
	]);
});

test("dont't update total if scoops input is invalid", async function () {
	render(<Options optionType="scoops" />);
	const vanillaInput = await screen.findByRole('spinbutton', {
		name: /vanilla/i,
	});

	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, '-1');

	// make sure scoops subtotal hasn't updated
	const scoopsSubtotal = screen.getByText('Scoops total: $0.00');
	expect(scoopsSubtotal).toBeInTheDocument();
});
