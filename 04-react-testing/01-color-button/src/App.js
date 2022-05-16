import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

export const replaceCamelCaseWithSpaces = colorName =>
	colorName.replace(/\B([A-Z])\B/g, letter => ' ' + letter);

function App() {
	const [buttonColor, setButtonColor] = useState('MediumVioletRed');
	const [disabled, setDisabled] = useState(false);
	const newButtonColor =
		buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed';

	return (
		<div className="App">
			<button
				style={{ backgroundColor: disabled ? 'gray' : buttonColor }}
				onClick={() => setButtonColor(newButtonColor)}
				disabled={disabled}
			>
				Change to {newButtonColor}
			</button>
			<input
				type="checkbox"
				defaultChecked={disabled}
				id="enable-button-checkbox"
				aria-checked={disabled}
				onClick={event => setDisabled(event.target.checked)}
			/>
			<label for="enable-button-checkbox">Disable Button</label>
		</div>
	);
}

export default App;
