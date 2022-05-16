import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

export default function ScoopOption({ name, imagePath, updateItemCount }) {
	const [isValid, setIsValid] = useState(true);

	const handleChange = event => {
		const currentValue = event.target.value;

		// Make sure we're using a number and not a string to validate
		const currentValueFloat = parseFloat(currentValue);

		// validate
		const valueIsValid =
			0 <= currentValueFloat &&
			currentValueFloat <= 10 &&
			Math.floor(currentValueFloat) === currentValueFloat;

		//validate
		setIsValid(valueIsValid);

		if (valueIsValid) updateItemCount(name, currentValue);
	};

	return (
		<div>
			<img
				style={{ width: '75%' }}
				src={`http://localhost:3030/${imagePath}`}
				alt={`${name} scoop`}
			/>
			<Form.Group
				controlId={`${name}-count`}
				as={Row}
				style={{ marginTop: '10px' }}
			>
				<Form.Label column xs="6" style={{ textAlign: 'right' }}>
					{name}
				</Form.Label>
				<Col xs="5" style={{ textAlign: 'left' }}>
					<Form.Control
						type="number"
						isInvalid={!isValid}
						defaultValue={0}
						onChange={handleChange}
					/>
				</Col>
			</Form.Group>
		</div>
	);
}
