import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../context/OrderDetails';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('Update scoop subtotal when scoops change.', async () => {
	render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

	// make sure total starts out $0.00
	const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
	expect(scoopsSubtotal).toHaveTextContent('0.00');

	// update vanilla scoops to 1 and check the subtotal
	const vanillaInput = await screen.findByRole('spinbutton', {
		name: 'Vanilla',
	});
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, '1');
	expect(scoopsSubtotal).toHaveTextContent('2.00');

	// update chocolate scoops to 2 and check subtotal
	const chocolateInput = await screen.findByRole('spinbutton', {
		name: 'Chocolate',
	});
	userEvent.clear(chocolateInput);
	userEvent.type(chocolateInput, '2');
	expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('Testing the topping added to the scoops', async function () {
	render(<Options optionType="toppings" />);

	const toppingsSubtotal = screen.getByText('Toppings total: $', {
		exact: false,
	});
	expect(toppingsSubtotal).toHaveTextContent('0.00');

	const cherriesCheckbox = await screen.findByRole('checkbox', {
		name: /cherries/i,
	});
	userEvent.click(cherriesCheckbox);
	expect(toppingsSubtotal).toHaveTextContent('1.50');

	const hotFudgeCheckbox = await screen.findByRole('checkbox', {
		name: /hot fudge/i,
	});
	userEvent.click(hotFudgeCheckbox);
	expect(toppingsSubtotal).toHaveTextContent('3.00');

	userEvent.click(hotFudgeCheckbox);
	expect(toppingsSubtotal).toHaveTextContent('1.50');

	userEvent.click(cherriesCheckbox);
	expect(toppingsSubtotal).toHaveTextContent('0.00');
});

describe('grand total test', () => {
	test('grandTotal starts at $0.00', () => {
		render(<OrderEntry />);
		const totalValue = screen.getByRole('heading', {
			name: /grand total: \$/i,
		});

		expect(totalValue).toHaveTextContent('0.00');
	});

	test('grand total updates properly if scoop is added', async function () {
		render(<OrderEntry />);
		const totalValue = screen.getByRole('heading', {
			name: /grand total: \$/i,
		});
		const chocolateScoop = await screen.findByRole('spinbutton', {
			name: /chocolate/i,
		});

		// add chocolate to cart
		userEvent.clear(chocolateScoop);
		userEvent.type(chocolateScoop, '2');
		expect(totalValue).toHaveTextContent('4.00');

		// add cherries
		const cherriesCheckbox = await screen.findByRole('checkbox', {
			name: /cherries/i,
		});
		userEvent.click(cherriesCheckbox);
		expect(totalValue).toHaveTextContent('5.50');
	});

	test('grand total updates properly if toppings is added first', async function () {
		render(<OrderEntry />);

		const totalValue = screen.getByRole('heading', {
			name: /grand total: \$/i,
		});
		const cherriesCheckbox = await screen.findByRole('checkbox', {
			name: /cherries/i,
		});
		userEvent.click(cherriesCheckbox);
		expect(totalValue).toHaveTextContent('1.50');

		// update vanilla scoops to 2 and check value
		const vanillaInput = await screen.findByRole('spinbutton', {
			name: /vanilla/i,
		});
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, '3');
		expect(totalValue).toHaveTextContent('7.50');
	});

	test('grand total updates properly if remove scoop', async function () {
		render(<OrderEntry />);

		const totalValue = screen.getByRole('heading', {
			name: /grand total: \$/i,
		});
		const cherriesCheckbox = await screen.findByRole('checkbox', {
			name: /cherries/i,
		});
		const vanillaInput = await screen.findByRole('spinbutton', {
			name: /vanilla/i,
		});
		userEvent.click(cherriesCheckbox);
		userEvent.clear(vanillaInput, '2');

		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, '1');

		expect(totalValue).toHaveTextContent('3.50');

		userEvent.click(cherriesCheckbox);
		expect(totalValue).toHaveTextContent('2.00');
	});
});
