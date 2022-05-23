import {
	fireEvent,
	render,
	screen,
	waitForElementToBeRemoved,
} from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

test('Initial conditions', () => {
	render(<SummaryForm />);

	const checkbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});

	expect(checkbox).not.toBeChecked();

	const confirmButton = screen.getByRole('button', { name: /confirm order/i });
	expect(confirmButton).toBeDisabled();
});

test('Testing disabling and enabling the checkbox', () => {
	render(<SummaryForm />);

	const checkbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	const button = screen.getByRole('button', { name: 'Confirm Order' });

	expect(checkbox).not.toBeChecked();
	expect(button).toBeDisabled();
	userEvent.click(checkbox);
	expect(button).toBeEnabled();
});

test('Popover responds to hover', async () => {
	render(<SummaryForm />);
	// popover starts out hidden
	const nullPopover = screen.queryByText(
		/no ice cream will actually be delivered/i,
	);
	expect(nullPopover).not.toBeInTheDocument();

	// popover appears upon mouseover of checkbox label
	const termsAndConditions = screen.getByText(/terms and conditions/i);
	userEvent.hover(termsAndConditions);

	const popover = screen.getByText(/no ice cream will actually be delivered/i);
	expect(popover).toBeInTheDocument(); // we let this function because in this way its more readable

	// popover disappears when we mouse out
	userEvent.unhover(termsAndConditions);
	await waitForElementToBeRemoved(() =>
		screen.queryByText(/no ice cream will actually be delivered/i),
	);
});
