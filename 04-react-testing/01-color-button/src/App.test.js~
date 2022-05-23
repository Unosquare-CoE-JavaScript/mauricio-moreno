import { render, screen, fireEvent } from '@testing-library/react';
import App, { replaceCamelCaseWithSpaces } from './App';

test('The button has the correct inicial color.', () => {
	render(<App />);

	// Find an element with a role of button and text of change to MidnightBlue.
	const colorButton = screen.getByRole('button', {
		name: 'Change to MidnightBlue',
	});

	// Expect the background color to be MediumVioletRed.
	expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

	// click the button
	fireEvent.click(colorButton);

	// expect the background color to be MidnightBlue
	expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });

	// expect the button text to be 'Change to MediumVioletRed'
	expect(colorButton).toHaveTextContent('Change to MediumVioletRed');
});

test('Button turns MidnightBlue whin clicked', () => {
	render(<App />);
	const colorButton = screen.getByRole('button', {
		name: 'Change to MidnightBlue',
	});

	fireEvent.click(colorButton);
	expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });
});

test('Initial conditions.', () => {
	render(<App />);
	// chek that the button starts out enabled
	const colorButton = screen.getByRole('button', {
		name: 'Change to MidnightBlue',
	});
	expect(colorButton).toBeEnabled();

	// check that the checkbox starts out unchecked
	const checkbox = screen.getByRole('checkbox');
	expect(checkbox).not.toBeChecked();
});

test('Disabling the button with the checkbox', () => {
	render(<App />);

	const checkbox = screen.getByRole('checkbox', { name: 'Disable Button' });
	const colorButton = screen.getByRole('button');

	expect(colorButton).toBeEnabled();
	fireEvent.click(checkbox);
	expect(colorButton).toBeDisabled();
	fireEvent.click(checkbox);
	expect(colorButton).toBeEnabled();
});

//! Exercise
test('Disabling the button will make the button gray', () => {
	render(<App />);
	const checkbox = screen.getByRole('checkbox', { name: 'Disable Button' });
	const button = screen.getByRole('button', { name: 'Change to MidnightBlue' });

	// Starting pint
	expect(button).toHaveStyle({ backgroundColor: 'MediumVioletRed' });
	// disables button
	fireEvent.click(checkbox);
	expect(button).toHaveStyle({ backgroundColor: 'gray' });
	// Enables button
	fireEvent.click(checkbox);
	expect(button).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

	// Chages color to MidnightBlue
	fireEvent.click(button);
	expect(button).toHaveStyle({ backgroundColor: 'MidnightBlue' });
	// Disables button
	fireEvent.click(checkbox);
	expect(button).toHaveStyle({ backgroundColor: 'gray' });
	// Enables again expecting a MidnightBlue button
	fireEvent.click(checkbox);
	expect(button).toHaveStyle({ backgroundColor: 'MidnightBlue' });
});

describe('Spaces before camel-case capital letters', () => {
	test('Works for no innter capital letters', () => {
		expect(replaceCamelCaseWithSpaces('Red')).toBe('Red');
	});

	test('Works for one innter capital letter', () => {
		expect(replaceCamelCaseWithSpaces('MidnightBlue')).toBe('Midnight Blue');
	});
	test('Works for multiple inner capital letters', () => {
		expect(replaceCamelCaseWithSpaces('MediumVioletRed')).toBe(
			'Medium Violet Red',
		);
	});
});
